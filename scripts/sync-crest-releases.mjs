#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import {
  CREST_RELEASES_API_URL,
  CREST_RELEASES_PAGE_URL,
  normalizeReleasePayload,
} from "../lib/crest-release-utils.mjs";

const OUT_FILE =
  process.env.CREST_RELEASES_OUT || "public/data/crest-releases.json";
const CREST_RELEASES_ATOM_URL =
  "https://github.com/sevoniva/Crest/releases.atom";

async function fetchGithubReleases() {
  const response = await fetch(CREST_RELEASES_API_URL, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(process.env.GITHUB_TOKEN
        ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
        : {}),
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    const detail = body ? `\n${body.slice(0, 500)}` : "";
    throw new Error(`GitHub Releases returned ${response.status}${detail}`);
  }

  return response.json();
}

async function fetchAtomReleases() {
  const response = await fetch(CREST_RELEASES_ATOM_URL);

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    const detail = body ? `\n${body.slice(0, 500)}` : "";
    throw new Error(`GitHub Releases Atom returned ${response.status}${detail}`);
  }

  return parseAtomReleases(await response.text());
}

function parseAtomReleases(xml) {
  return Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)).map(
    (match, index) => {
      const entry = match[1];
      const htmlUrl = getXmlAttribute(entry, "link", "href");
      const tagName = decodeXml(htmlUrl.match(/\/tag\/([^/"]+)/)?.[1] ?? "");
      const title = decodeXml(getXmlValue(entry, "title")) || tagName;
      const updated = decodeXml(getXmlValue(entry, "updated")) || null;
      const htmlBody = decodeXml(getXmlValue(entry, "content"));

      return {
        id: `${tagName || "release"}-${index}`,
        name: title,
        tag_name: tagName,
        body: htmlToMarkdownText(htmlBody),
        html_url: htmlUrl,
        published_at: updated,
        prerelease: false,
        draft: false,
        assets: extractReleaseAssets(tagName, htmlBody),
      };
    }
  );
}

function getXmlValue(xml, tagName) {
  return (
    xml.match(
      new RegExp(`<${tagName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tagName}>`)
    )?.[1] ?? ""
  );
}

function getXmlAttribute(xml, tagName, attributeName) {
  const tag = xml.match(new RegExp(`<${tagName}\\s+([^>]*)>`))?.[1] ?? "";
  return decodeXml(
    tag.match(new RegExp(`${attributeName}="([^"]+)"`))?.[1] ?? ""
  );
}

function decodeXml(value) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function htmlToMarkdownText(html) {
  return html
    .replace(/<table[^>]*>([\s\S]*?)<\/table>/g, (_, content) => {
      return `\n${tableToMarkdownText(content)}\n`;
    })
    .replace(
      /<pre[^>]*>[\s\S]*?<code[^>]*>([\s\S]*?)<\/code>[\s\S]*?<\/pre>/g,
      (_, content) => {
        return `\n${stripCodeHtml(content)}\n\n`;
      }
    )
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g, (_, level, content) => {
      const depth = Math.min(Number(level), 3);
      return `\n${"#".repeat(depth)} ${stripHtml(content)}\n`;
    })
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/g, (_, content) => {
      return `- ${stripHtml(content)}\n`;
    })
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/g, (_, content) => {
      return `${stripHtml(content)}\n\n`;
    })
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function tableToMarkdownText(value) {
  const rows = Array.from(value.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g))
    .map((row) =>
      Array.from(row[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g))
        .map((cell) => stripHtml(cell[1]))
        .filter(Boolean)
    )
    .filter((cells) => cells.length > 0);

  return rows
    .slice(1)
    .map(([name, ...description]) => {
      const suffix = description.length ? `：${description.join("；")}` : "";
      return `- ${name}${suffix}`;
    })
    .join("\n");
}

function stripCodeHtml(value) {
  return decodeXml(value.replace(/<[^>]+>/g, ""))
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

function stripHtml(value) {
  return decodeXml(value.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function extractReleaseAssets(tagName, html) {
  const assetNames = new Set(
    Array.from(
      stripHtml(html).matchAll(
        /crest-offline-[\w.-]+?(?:\.tar\.gz|\.txt|\.zip)/g
      )
    ).map((match) => match[0])
  );

  return Array.from(assetNames).map((name, index) => ({
    id: `${tagName}-${index}`,
    name,
    size: 0,
    browser_download_url: `https://github.com/sevoniva/Crest/releases/download/${tagName}/${name}`,
    download_count: 0,
  }));
}

function compactRelease(release) {
  return {
    id: release.id,
    name: release.name ?? null,
    tag_name: release.tag_name,
    body: release.body ?? null,
    html_url: release.html_url,
    published_at: release.published_at ?? null,
    prerelease: Boolean(release.prerelease),
    draft: Boolean(release.draft),
    assets: Array.isArray(release.assets)
      ? release.assets.map((asset) => ({
          id: asset.id,
          name: asset.name,
          size: asset.size ?? 0,
          browser_download_url: asset.browser_download_url,
          download_count: asset.download_count ?? 0,
        }))
      : [],
  };
}

async function writeJson(filePath, payload) {
  const outputPath = path.resolve(filePath);
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(
    outputPath,
    `${JSON.stringify(payload, null, 2)}\n`,
    "utf8"
  );
  return outputPath;
}

async function main() {
  let rawReleases;
  let source = "github-api";

  try {
    rawReleases = await fetchGithubReleases();
  } catch (error) {
    source = "github-atom";
    console.warn("GitHub Releases API unavailable, falling back to Atom feed.");
    console.warn(error instanceof Error ? error.message : error);
    rawReleases = await fetchAtomReleases();
  }

  const releases = normalizeReleasePayload(rawReleases).map(compactRelease);
  const payload = {
    source,
    repo: "sevoniva/Crest",
    apiUrl: CREST_RELEASES_API_URL,
    atomUrl: CREST_RELEASES_ATOM_URL,
    pageUrl: CREST_RELEASES_PAGE_URL,
    fetchedAt: new Date().toISOString(),
    releases,
  };

  const outputPath = await writeJson(OUT_FILE, payload);
  const latest = releases[0]?.tag_name ?? "none";
  console.log(
    `Synced ${releases.length} Crest releases to ${outputPath} (latest: ${latest})`
  );
}

main().catch((error) => {
  console.error("Failed to sync Crest releases:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
