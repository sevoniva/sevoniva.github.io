#!/usr/bin/env node
/**
 * 从 GitHub 仓库同步文档到本地
 *
 * 通过 GitHub Trees API 获取目录结构，raw.githubusercontent.com 下载文件。
 * 无 API 限流，适合 build 阶段调用。
 *
 * 用法：
 *   pnpm sync-docs                                  # 使用默认配置
 *   DOCS_REPO=sevoniva/nivora DOCS_DIR=docs pnpm sync-docs
 */
import fs from "fs/promises";
import path from "path";

// ─── 配置 ───
const REPO = process.env.DOCS_REPO || "sevoniva/nivora";
const BRANCH = process.env.DOCS_BRANCH || "main";
const SOURCE_DIR = process.env.DOCS_DIR || "docs"; // 仓库内文档目录，空字符串表示根目录
const OUT_DIR = process.env.DOCS_OUT_DIR || "content/raw";
const INCLUDE = (process.env.DOCS_INCLUDE || ".md,.mdx").split(",");
const EXCLUDE = (process.env.DOCS_EXCLUDE || "")
  .split(",")
  .filter(Boolean);

const [OWNER, REPO_NAME] = REPO.split("/");
if (!OWNER || !REPO_NAME) {
  console.error("❌ DOCS_REPO 格式错误，应为 owner/repo");
  process.exit(1);
}

// ─── 工具函数 ───

function shouldInclude(filePath) {
  const lower = filePath.toLowerCase();
  const hasExt = INCLUDE.some((ext) => lower.endsWith(ext.trim()));
  const excluded = EXCLUDE.some((pattern) => lower.includes(pattern.trim()));
  return hasExt && !excluded;
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${url}\n${text}`);
  }
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${url}`);
  }
  return res.text();
}

async function writeFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, "utf-8");
}

// ─── 主逻辑 ───

async function main() {
  const outDir = path.resolve(OUT_DIR);
  const prefix = SOURCE_DIR ? SOURCE_DIR.replace(/\/$/, "") + "/" : "";

  console.log(`\n📦 仓库: ${REPO}@${BRANCH}`);
  console.log(`📂 源目录: ${prefix || "(root)"}`);
  console.log(`📂 输出目录: ${outDir}\n`);

  // 1. 获取完整目录树
  const treeUrl = `https://api.github.com/repos/${OWNER}/${REPO_NAME}/git/trees/${BRANCH}?recursive=1`;
  const treeData = await fetchJson(treeUrl);

  if (!treeData.tree || !Array.isArray(treeData.tree)) {
    throw new Error("无法获取目录树");
  }

  // 2. 过滤目标文件
  const files = treeData.tree.filter((item) => {
    if (item.type !== "blob") return false;
    if (!item.path.startsWith(prefix)) return false;
    return shouldInclude(item.path);
  });

  if (files.length === 0) {
    console.log("⚠️  未找到匹配的文档文件");
    process.exit(0);
  }

  console.log(`📝 发现 ${files.length} 个文档文件\n`);

  // 3. 下载文件
  let downloaded = 0;
  let skipped = 0;

  for (const file of files) {
    const relativePath = prefix ? file.path.slice(prefix.length) : file.path;
    const outPath = path.join(outDir, relativePath);
    const rawUrl = `https://raw.githubusercontent.com/${OWNER}/${REPO_NAME}/${BRANCH}/${file.path}`;

    // 简单缓存：如果文件已存在且大小一致，跳过
    try {
      const stat = await fs.stat(outPath);
      if (stat.size === file.size) {
        console.log(`⏭  ${relativePath}`);
        skipped++;
        continue;
      }
    } catch {
      // 文件不存在，继续下载
    }

    const content = await fetchText(rawUrl);
    await writeFile(outPath, content);
    console.log(`✅  ${relativePath}`);
    downloaded++;
  }

  // 4. 写入同步记录
  const syncRecord = {
    repo: REPO,
    branch: BRANCH,
    sourceDir: SOURCE_DIR,
    syncedAt: new Date().toISOString(),
    sha: treeData.sha,
    files: files.length,
    downloaded,
    skipped,
  };
  await writeFile(
    path.join(outDir, ".sync-record.json"),
    JSON.stringify(syncRecord, null, 2)
  );

  console.log(`\n✅ 同步完成`);
  console.log(`   下载: ${downloaded}`);
  console.log(`   跳过: ${skipped}`);
  console.log(`   总计: ${files.length}`);
}

main().catch((err) => {
  console.error("\n❌ 同步失败:\n", err.message);
  process.exit(1);
});
