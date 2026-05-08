#!/usr/bin/env node
/**
 * 将普通 Markdown (.md) 批量转换为 Fumadocs MDX (.mdx)
 *
 * 用法：
 *   pnpm convert-md                    # 转换 content/raw/ 下所有 .md
 *   pnpm convert-md --dir ./docs       # 指定其他目录
 *   pnpm convert-md --out ./content/docs  # 指定输出目录
 */
import fs from "fs/promises";
import path from "path";

const RAW_DIR = process.argv.includes("--dir")
  ? process.argv[process.argv.indexOf("--dir") + 1]
  : "content/raw";

const OUT_DIR = process.argv.includes("--out")
  ? process.argv[process.argv.indexOf("--out") + 1]
  : "content/docs";

/**
 * 从文件名生成标题
 * hello-world.md -> Hello World
 */
function filenameToTitle(filename) {
  const base = path.basename(filename, path.extname(filename));
  return base
    .replace(/[-_]/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

/**
 * 从内容中提取第一行 # 标题
 */
function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

/**
 * 检查是否已有 frontmatter
 */
function hasFrontmatter(content) {
  return content.trimStart().startsWith("---");
}

/**
 * 转换单个文件
 */
async function convertFile(filePath, relativePath) {
  const content = await fs.readFile(filePath, "utf-8");

  // 如果已经有 frontmatter，直接复制并改后缀
  if (hasFrontmatter(content)) {
    return content;
  }

  const title = extractTitle(content) || filenameToTitle(filePath);
  const description = ""; // 可扩展：从内容提取第一段作为描述

  const frontmatter = `---\ntitle: ${title}\n${description ? `description: ${description}\n` : ""}---\n\n`;

  return frontmatter + content;
}

/**
 * 递归处理目录
 */
async function processDir(dir, outDir, base = "") {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(base, entry.name);

    if (entry.isDirectory()) {
      await processDir(fullPath, outDir, relPath);
      continue;
    }

    if (!entry.name.endsWith(".md")) continue;

    const outRelPath = relPath.replace(/\.md$/, ".mdx");
    const outPath = path.join(outDir, outRelPath);

    await fs.mkdir(path.dirname(outPath), { recursive: true });

    const converted = await convertFile(fullPath, relPath);
    await fs.writeFile(outPath, converted, "utf-8");

    console.log(`✅  ${relPath}  →  ${outRelPath}`);
  }
}

async function main() {
  const rawDir = path.resolve(RAW_DIR);
  const outDir = path.resolve(OUT_DIR);

  try {
    await fs.access(rawDir);
  } catch {
    console.error(`❌ 目录不存在: ${rawDir}`);
    console.log(`提示：把 .md 文件放到 ${RAW_DIR}/ 目录后再运行`);
    process.exit(1);
  }

  console.log(`\n📂 源目录: ${rawDir}`);
  console.log(`📂 输出目录: ${outDir}\n`);

  await processDir(rawDir, outDir);

  console.log(`\n🎉 转换完成！`);
  console.log(`提示：记得检查 ${OUT_DIR}/meta.json 是否需要更新文档顺序`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
