#!/usr/bin/env node
/**
 * 将普通 Markdown (.md) 批量转换为 Fumadocs MDX (.mdx)
 *
 * 带 MDX 兼容性预处理，自动处理 GitHub Markdown 中 MDX 不支持的语法。
 *
 * 用法：
 *   pnpm convert-md
 *   pnpm convert-md --dir ./docs --out ./content/docs
 */
import fs from "fs/promises";
import path from "path";

const RAW_DIR = process.argv.includes("--dir")
  ? process.argv[process.argv.indexOf("--dir") + 1]
  : "content/raw";

const OUT_DIR = process.argv.includes("--out")
  ? process.argv[process.argv.indexOf("--out") + 1]
  : "content/docs";

// MDX/Shiki 支持的代码块语言白名单（常见 + 项目用到的）
// 不在这个列表中的语言会被替换为 "text"，避免 build 失败
const SUPPORTED_LANGS = new Set([
  "bash", "sh", "shell", "zsh",
  "js", "javascript", "ts", "typescript", "jsx", "tsx",
  "go", "golang", "java", "kotlin", "rust", "c", "cpp", "cxx", "h",
  "py", "python", "rb", "ruby", "php", "perl",
  "json", "yaml", "yml", "toml", "xml", "svg",
  "sql", "psql", "mysql", "postgres", "postgresql",
  "html", "css", "scss", "sass", "less", "md", "mdx",
  "dockerfile", "docker", "makefile", "nginx", "vim", "lua",
  "graphql", "regex", "diff", "ini", "properties",
  "http", "curl", "log", "text", "plaintext", "",
]);

function filenameToTitle(filename) {
  const base = path.basename(filename, path.extname(filename));
  return base
    .replace(/[-_]/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

function hasFrontmatter(content) {
  return content.trimStart().startsWith("---");
}

function safeYamlString(str) {
  // YAML 中冒号、#、{、} 等需要引号包裹
  if (/[:#{\[\]'"\n]/.test(str)) {
    return `"${str.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return str;
}

/**
 * MDX 兼容性预处理
 * GitHub Markdown 中很多语法在 MDX 中不兼容
 */
function mdxPreprocess(content) {
  // 1. 表格中的 <数字 模式 — MDX 会把 < 当作 JSX 标签
  //    | foo | <1 bar | → | foo | {'<1 bar '} |
  content = content.replace(/\|([^|]*?)<([0-9][^|]*)\|/g, "|$1{'<$2'}|");

  // 2. 内联 HTML 标签中的 < — 如 <kbd>、<sup> 等
  //    暂不处理，因为合法的 HTML 标签 MDX 是支持的

  // 3. 行内 { 和 } — MDX 会把 {} 当作表达式
  //    如果不在代码块内，且包含特殊字符，需要转义
  //    这个比较难全局处理，暂时只处理已知问题模式

  // 4. 代码块语言映射
  content = content.replace(/```(\w+)?\n/g, (match, lang) => {
    if (!lang) return match;
    const lower = lang.toLowerCase().trim();
    if (!SUPPORTED_LANGS.has(lower)) {
      // 记录映射（只记录一次）
      if (!mdxPreprocess._langMap) mdxPreprocess._langMap = new Map();
      if (!mdxPreprocess._langMap.has(lower)) {
        mdxPreprocess._langMap.set(lower, true);
        console.log(`    ⚠️  code lang "${lang}" → "text"`);
      }
      return "```text\n";
    }
    return match;
  });

  // 5. 修复 Markdown 表格中空单元格的格式问题
  //    有些 GitHub Markdown 表格行尾有空格或不一致的 | 数量

  return content;
}

async function convertFile(filePath, relativePath) {
  let content = await fs.readFile(filePath, "utf-8");

  // MDX 兼容性预处理
  content = mdxPreprocess(content);

  // 如果已经有 frontmatter，直接复制
  if (hasFrontmatter(content)) {
    return content;
  }

  const title = extractTitle(content) || filenameToTitle(filePath);
  const frontmatter = `---\ntitle: ${safeYamlString(title)}\n---\n\n`;

  return frontmatter + content;
}

async function processDir(dir, outDir, base = "") {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const results = { ok: 0, fail: 0, errors: [] };

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(base, entry.name);

    if (entry.isDirectory()) {
      const sub = await processDir(fullPath, outDir, relPath);
      results.ok += sub.ok;
      results.fail += sub.fail;
      results.errors.push(...sub.errors);
      continue;
    }

    if (!entry.name.endsWith(".md")) continue;

    const outRelPath = relPath.replace(/\.md$/, ".mdx");
    const outPath = path.join(outDir, outRelPath);

    await fs.mkdir(path.dirname(outPath), { recursive: true });

    try {
      const converted = await convertFile(fullPath, relPath);
      await fs.writeFile(outPath, converted, "utf-8");
      console.log(`✅  ${relPath}`);
      results.ok++;
    } catch (err) {
      console.error(`❌  ${relPath}: ${err.message}`);
      results.fail++;
      results.errors.push({ file: relPath, error: err.message });
    }
  }

  return results;
}

async function main() {
  const rawDir = path.resolve(RAW_DIR);
  const outDir = path.resolve(OUT_DIR);

  try {
    await fs.access(rawDir);
  } catch {
    console.error(`❌ 目录不存在: ${rawDir}`);
    process.exit(1);
  }

  console.log(`\n📂 源目录: ${rawDir}`);
  console.log(`📂 输出目录: ${outDir}\n`);

  const results = await processDir(rawDir, outDir);

  console.log(`\n✅ 转换完成: ${results.ok} 成功, ${results.fail} 失败`);

  if (results.errors.length > 0) {
    console.log(`\n失败的文件:`);
    for (const e of results.errors) {
      console.log(`  - ${e.file}: ${e.error}`);
    }
    // 不退出进程，让 build 继续（失败的文件只是不可访问）
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
