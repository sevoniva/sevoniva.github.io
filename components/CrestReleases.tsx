"use client";

import {
  Download,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  CREST_RELEASES_API_URL,
  CREST_RELEASES_LOCAL_URL,
  CREST_RELEASES_PAGE_URL,
  formatAssetSize,
  formatReleaseDate,
  getReleasePayloadFetchedAt,
  getReleaseLabel,
  getReleaseSummary,
  getReleaseUpdatedLabel,
  normalizeReleasePayload,
  shouldFetchGithubReleases,
  shouldLoadBuildReleaseSnapshot,
  sortReleaseAssets,
} from "@/lib/crest-release-utils.mjs";

type GitHubAsset = {
  id: number | string;
  name: string;
  size: number;
  browser_download_url: string;
  download_count: number;
};

type GitHubRelease = {
  id: number | string;
  name: string | null;
  tag_name: string;
  body: string | null;
  html_url: string;
  published_at: string | null;
  prerelease: boolean;
  draft: boolean;
  assets: GitHubAsset[];
};

type ReleaseCache = {
  fetchedAt: number;
  releases: GitHubRelease[];
};

type ReleaseSource = "none" | "cache" | "build" | "github";

const CACHE_KEY = "crest:github-releases:v2";
const CACHE_TTL = 15 * 60 * 1000;

function readReleaseCache(): ReleaseCache | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(CACHE_KEY);
    if (!value) return null;

    const parsed = JSON.parse(value) as ReleaseCache;
    if (!Array.isArray(parsed.releases) || !parsed.fetchedAt) return null;
    if (parsed.releases.length === 0) return null;

    return parsed;
  } catch {
    return null;
  }
}

function readFreshReleaseCache() {
  const cached = readReleaseCache();
  if (!cached) return null;
  if (Date.now() - cached.fetchedAt >= CACHE_TTL) return null;
  return cached;
}

function writeReleaseCache(releases: GitHubRelease[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ fetchedAt: Date.now(), releases })
    );
  } catch {
    // localStorage may be disabled. The page should still work without cache.
  }
}

function formatReleaseDay(value: string | null) {
  if (!value) return "发布时间未知";
  return formatReleaseDate(value).replace(/\s+\d{2}:\d{2}$/, "");
}

export default function CrestReleases() {
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<number | null>(null);
  const [expandedReleaseId, setExpandedReleaseId] = useState<
    GitHubRelease["id"] | null
  >(null);
  const [source, setSource] = useState<ReleaseSource>("none");

  const newestRelease = releases[0];
  const latestVersion = newestRelease?.tag_name ?? "暂无发布版本";

  const updatedText = useMemo(() => {
    if (!fetchedAt) return "尚未同步";
    return formatReleaseDate(new Date(fetchedAt).toISOString());
  }, [fetchedAt]);

  const updatedLabel = useMemo(() => {
    return getReleaseUpdatedLabel(source);
  }, [source]);

  const loadReleases = useCallback(async (force = false) => {
    const cached = readReleaseCache();
    const freshCached = force ? null : readFreshReleaseCache();
    let hasResolvedData = releases.length > 0;
    let lastError: unknown = null;

    setRefreshing(force);

    const applyPayload = (
      payload: unknown,
      nextSource: ReleaseSource,
      fallbackFetchedAt = Date.now()
    ) => {
      const visibleReleases = normalizeReleasePayload(
        payload
      ) as GitHubRelease[];
      const nextFetchedAt = getReleasePayloadFetchedAt(
        payload,
        fallbackFetchedAt
      );

      setReleases(visibleReleases);
      setFetchedAt(nextFetchedAt);
      setSource(nextSource);
      setError(null);
      hasResolvedData = true;

      if (nextSource === "github") {
        writeReleaseCache(visibleReleases);
      }
    };

    if (freshCached?.releases.length) {
      setReleases(freshCached.releases);
      setFetchedAt(freshCached.fetchedAt);
      setSource("cache");
      setError(null);
      setLoading(false);
      hasResolvedData = true;
    }

    const fetchBuildSnapshot = async () => {
      const response = await fetch(CREST_RELEASES_LOCAL_URL, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`构建版本数据返回 ${response.status}`);
      }

      return response.json();
    };

    const fetchGithubReleases = async () => {
      const response = await fetch(CREST_RELEASES_API_URL, {
        headers: {
          Accept: "application/vnd.github+json",
        },
      });

      if (!response.ok) {
        throw new Error(`GitHub Releases 返回 ${response.status}`);
      }

      return response.json();
    };

    try {
      if (
        shouldLoadBuildReleaseSnapshot({
          force,
          hasFreshCache: Boolean(freshCached?.releases.length),
        })
      ) {
        try {
          applyPayload(await fetchBuildSnapshot(), "build");
          setLoading(false);
        } catch (cause) {
          lastError = cause;
        }
      }

      if (
        shouldFetchGithubReleases({
          force,
          hasResolvedSnapshot: hasResolvedData,
        })
      ) {
        try {
          applyPayload(await fetchGithubReleases(), "github");
          return;
        } catch (cause) {
          lastError = cause;
          if (hasResolvedData) return;
        }
      } else {
        return;
      }

      if (force) {
        try {
          applyPayload(await fetchBuildSnapshot(), "build");
          return;
        } catch (cause) {
          lastError = cause;
        }
      }

      if (cached?.releases.length) {
        setReleases(cached.releases);
        setFetchedAt(cached.fetchedAt);
        setSource("cache");
        setError(null);
        return;
      }

      setError(
        lastError instanceof Error ? lastError.message : "版本信息同步失败"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [releases.length]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadReleases(false);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [loadReleases]);

  return (
    <div className="not-prose my-8">
      <div className="mb-5 flex flex-col gap-3 border-b border-[#3B82F6]/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#1F2A44] dark:text-[#DDE8FF]">
          <span>
            最新版 <strong className="font-semibold">{latestVersion}</strong>
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-[#3B82F6]/60 sm:inline-block" />
          <span>{releases.length} 个版本</span>
          {fetchedAt ? (
            <>
              <span className="hidden h-1 w-1 rounded-full bg-[#3B82F6]/60 sm:inline-block" />
              <span>
                {updatedLabel} {updatedText}
              </span>
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void loadReleases(true)}
            disabled={refreshing}
            title={refreshing ? "正在刷新" : "刷新版本"}
            aria-label={refreshing ? "正在刷新" : "刷新版本"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#3B82F6]/20 text-[#2563EB] transition-colors hover:bg-[#EFF6FF] disabled:cursor-not-allowed disabled:opacity-60 dark:text-[#93C5FD] dark:hover:bg-[#1E3A8A]/20"
          >
            <RefreshCw
              className={["h-4 w-4", refreshing ? "animate-spin" : ""]
                .filter(Boolean)
                .join(" ")}
            />
          </button>
          <a
            href={CREST_RELEASES_PAGE_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#3B82F6]/20 px-3 text-sm font-medium text-[#2563EB] transition-colors hover:bg-[#EFF6FF] dark:text-[#93C5FD] dark:hover:bg-[#1E3A8A]/20"
          >
            GitHub
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {error ? (
        <div className="mb-5 rounded-xl border border-[#FFC53D]/50 bg-white p-4 text-sm leading-6 text-[#7C4A03] dark:bg-slate-950 dark:text-[#FDE68A]">
          版本信息暂时无法同步：{error}。可以稍后刷新，或直接访问{" "}
          <a
            href={CREST_RELEASES_PAGE_URL}
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline underline-offset-4"
          >
            GitHub Releases
          </a>
          。
        </div>
      ) : null}

      {loading ? <ReleaseSkeleton /> : null}

      {!loading && releases.length === 0 ? (
        <div className="rounded-xl border border-[#3B82F6]/15 bg-white p-6 text-sm text-[#1F2A44] dark:bg-slate-950 dark:text-[#DDE8FF]">
          当前没有可公开展示的 Release。发布新版本后，本页会自动读取 GitHub Releases。
        </div>
      ) : null}

      <div className="space-y-0">
        {releases.map((release, index) => (
          <ReleaseItem
            expanded={expandedReleaseId === release.id}
            key={release.id}
            last={index === releases.length - 1}
            release={release}
            latest={index === 0}
            onToggle={() =>
              setExpandedReleaseId((current) =>
                current === release.id ? null : release.id
              )
            }
          />
        ))}
      </div>
    </div>
  );
}

function ReleaseItem({
  expanded,
  last,
  latest,
  onToggle,
  release,
}: {
  expanded: boolean;
  last: boolean;
  latest: boolean;
  onToggle: () => void;
  release: GitHubRelease;
}) {
  const title = release.name || release.tag_name;
  const body = release.body?.trim() || "";
  const assets = sortReleaseAssets(release.assets);

  return (
    <article className="grid gap-3 py-5 md:grid-cols-[150px_minmax(0,1fr)]">
      <div className="pt-1 text-sm font-semibold text-[#2563EB] dark:text-[#93C5FD]">
        {formatReleaseDay(release.published_at)}
      </div>

      <div className="relative pl-6">
        <span className="absolute left-0 top-2 h-3 w-3 rounded-full border-2 border-white bg-[#3B82F6] shadow-[0_0_0_3px_rgba(59,130,246,0.16)] dark:border-slate-950" />
        {!last ? (
          <span className="absolute bottom-[-1.25rem] left-[5px] top-6 w-px bg-[#3B82F6]/18" />
        ) : null}

        <div
          className={[
            "relative rounded-xl border bg-white p-5 dark:bg-slate-950",
            latest
              ? "border-[#3B82F6]/35 shadow-[0_16px_40px_-28px_rgba(59,130,246,0.65)]"
              : "border-[#3B82F6]/16",
          ].join(" ")}
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-[#EFF6FF] px-2.5 py-1 text-xs font-semibold text-[#2563EB] dark:bg-[#1E3A8A]/30 dark:text-[#93C5FD]">
                  {release.tag_name}
                </span>
                <span className="inline-flex items-center rounded-full bg-[#EAFBF8] px-2.5 py-1 text-xs font-medium text-[#047A70] dark:bg-[#134E4A]/30 dark:text-[#5EEAD4]">
                  {getReleaseLabel(release)}
                </span>
                {latest ? (
                  <span className="inline-flex items-center rounded-full bg-[#FFF7D6] px-2.5 py-1 text-xs font-medium text-[#8A5A00] dark:bg-[#713F12]/30 dark:text-[#FDE68A]">
                    最新
                  </span>
                ) : null}
              </div>
              <h2 className="mt-3 text-xl font-semibold text-[#111827] dark:text-[#F8FAFC]">
                {title}
              </h2>
              <div className="mt-2 text-xs text-[#334155] dark:text-[#B8C7DD]">
                {assets.length} 个发布文件
              </div>
            </div>

            <a
              href={release.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-[#3B82F6]/20 px-3 text-sm font-medium text-[#2563EB] transition-colors hover:bg-[#EFF6FF] dark:text-[#93C5FD] dark:hover:bg-[#1E3A8A]/20"
            >
              发布页
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <p className="mt-4 text-sm leading-6 text-[#1F2A44] dark:text-[#DDE8FF]">
            {getReleaseSummary(body)}
          </p>

          <div className="mt-4 border-t border-[#3B82F6]/12 pt-4">
            <button
              type="button"
              aria-expanded={expanded}
              onClick={onToggle}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8] dark:text-[#93C5FD]"
            >
              <span
                className={[
                  "inline-block transition-transform",
                  expanded ? "rotate-90" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden="true"
              >
                ›
              </span>
              发布说明
            </button>
            {expanded ? <ReleaseBody body={body} /> : null}
          </div>

          {assets.length > 0 ? (
            <div className="mt-4 border-t border-[#3B82F6]/12 pt-4">
              <h3 className="text-sm font-semibold text-[#111827] dark:text-[#F8FAFC]">
                发布文件
              </h3>
              <div className="mt-2 grid gap-2">
                {assets.map((asset) => (
                  <a
                    key={asset.id}
                    href={asset.browser_download_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col gap-1 rounded-lg border border-[#3B82F6]/14 bg-white px-3 py-3 transition-colors hover:border-[#3B82F6]/32 hover:bg-[#F8FBFF] sm:flex-row sm:items-center sm:justify-between dark:bg-slate-950 dark:hover:bg-[#1E3A8A]/15"
                  >
                    <span className="inline-flex min-w-0 items-center gap-2 text-sm font-medium text-[#111827] dark:text-[#F8FAFC]">
                      <Download className="h-4 w-4 shrink-0 text-[#3B82F6]" />
                      <span className="break-all">{asset.name}</span>
                    </span>
                    <span className="shrink-0 text-xs text-[#334155] dark:text-[#B8C7DD]">
                      {formatAssetSize(asset.size)}
                      {asset.download_count > 0
                        ? ` · ${asset.download_count} 次下载`
                        : ""}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ReleaseBody({ body }: { body: string }) {
  const blocks = buildReleaseBlocks(body);

  if (blocks.length === 0) {
    return (
      <p className="mt-3 text-sm leading-6 text-[#1F2A44] dark:text-[#DDE8FF]">
        该版本暂无发布说明。
      </p>
    );
  }

  return <div className="mt-3 space-y-4">{blocks}</div>;
}

function buildReleaseBlocks(body: string) {
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];
  let paragraphLines: string[] = [];
  let codeLines: string[] | null = null;
  let tableLines: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    const currentItems = listItems;
    listItems = [];
    blocks.push(
      <ul
        key={`list-${blocks.length}`}
        className="list-disc space-y-1 pl-5 text-sm leading-6 text-[#1F2A44] dark:text-[#DDE8FF]"
      >
        {currentItems.map((item) => (
          <li key={item}>{renderInlineMarkdown(item, item)}</li>
        ))}
      </ul>
    );
  };

  const flushParagraph = () => {
    if (paragraphLines.length === 0) return;
    const text = paragraphLines.join(" ");
    paragraphLines = [];
    blocks.push(
      <p
        key={`paragraph-${blocks.length}`}
        className="text-sm leading-6 text-[#1F2A44] dark:text-[#DDE8FF]"
      >
        {renderInlineMarkdown(text, `paragraph-${blocks.length}`)}
      </p>
    );
  };

  const flushCode = () => {
    if (!codeLines) return;
    const code = codeLines.join("\n");
    codeLines = null;
    blocks.push(
      <pre
        key={`code-${blocks.length}`}
        className="overflow-x-auto rounded-lg border border-[#3B82F6]/15 bg-white p-4 text-xs leading-6 text-[#0F172A] dark:bg-slate-950 dark:text-[#E2E8F0]"
      >
        <code>{code}</code>
      </pre>
    );
  };

  const flushTable = () => {
    if (tableLines.length === 0) return;
    const currentLines = tableLines;
    tableLines = [];
    blocks.push(renderMarkdownTable(currentLines, `table-${blocks.length}`));
  };

  const flushTextBlocks = () => {
    flushParagraph();
    flushList();
    flushTable();
  };

  const lines = body.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (codeLines) {
      if (line.startsWith("```")) {
        flushCode();
      } else {
        codeLines.push(rawLine.replace(/\s+$/, ""));
      }
      continue;
    }

    if (line.startsWith("```")) {
      flushTextBlocks();
      codeLines = [];
      continue;
    }

    if (tableLines.length > 0) {
      if (isTableLine(line)) {
        tableLines.push(line);
        continue;
      }
      flushTable();
    }

    if (!line) {
      flushTextBlocks();
      continue;
    }

    const nextLine = lines[index + 1]?.trim() ?? "";
    if (isTableLine(line) && isTableDivider(nextLine)) {
      flushParagraph();
      flushList();
      tableLines = [line];
      continue;
    }

    if (line.startsWith("#")) {
      flushTextBlocks();
      blocks.push(
        <h4
          key={`heading-${blocks.length}`}
          className="text-sm font-semibold text-[#111827] dark:text-[#F8FAFC]"
        >
          {renderInlineMarkdown(
            line.replace(/^#+\s*/, ""),
            `heading-${blocks.length}`
          )}
        </h4>
      );
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      listItems.push(line.replace(/^[-*]\s+/, ""));
      continue;
    }

    paragraphLines.push(line);
  }

  flushTextBlocks();
  flushCode();
  return blocks;
}

function stripMarkdown(value: string) {
  return value
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function renderInlineMarkdown(value: string, keyPrefix: string) {
  const nodes: ReactNode[] = [];
  const pattern =
    /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(value))) {
    if (match.index > lastIndex) {
      nodes.push(value.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      nodes.push(
        <a
          key={`${keyPrefix}-link-${match.index}`}
          href={match[3]}
          target={match[3].startsWith("http") ? "_blank" : undefined}
          rel={match[3].startsWith("http") ? "noreferrer" : undefined}
          className="font-medium text-[#2563EB] underline-offset-4 hover:underline dark:text-[#93C5FD]"
        >
          {match[2]}
        </a>
      );
    } else if (match[4]) {
      nodes.push(
        <code
          key={`${keyPrefix}-code-${match.index}`}
          className="rounded border border-[#3B82F6]/15 bg-[#EFF6FF] px-1 py-0.5 text-[0.85em] text-[#1D4ED8] dark:bg-[#1E3A8A]/25 dark:text-[#BFDBFE]"
        >
          {match[4]}
        </code>
      );
    } else if (match[5]) {
      nodes.push(
        <strong
          key={`${keyPrefix}-strong-${match.index}`}
          className="font-semibold text-[#111827] dark:text-[#F8FAFC]"
        >
          {match[5]}
        </strong>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < value.length) {
    nodes.push(value.slice(lastIndex));
  }

  return nodes;
}

function renderMarkdownTable(lines: string[], key: string) {
  const rows = lines
    .filter((line) => !isTableDivider(line))
    .map(splitTableLine)
    .filter((cells) => cells.length > 0);
  const [headers, ...bodyRows] = rows;

  if (!headers) return null;

  return (
    <div key={key} className="overflow-x-auto rounded-lg border border-[#3B82F6]/15">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-[#3B82F6]/12 bg-white px-3 py-2 text-left font-semibold text-[#111827] dark:bg-slate-950 dark:text-[#F8FAFC]"
              >
                {renderInlineMarkdown(header, `${key}-header-${header}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <tr key={`${key}-row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`${key}-cell-${rowIndex}-${cellIndex}`}
                  className="border-t border-[#3B82F6]/8 px-3 py-2 leading-6 text-[#1F2A44] dark:text-[#DDE8FF]"
                >
                  {renderInlineMarkdown(cell, `${key}-cell-${rowIndex}-${cellIndex}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function isTableLine(line: string) {
  return line.includes("|") && line.split("|").length >= 3;
}

function isTableDivider(line: string) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line);
}

function splitTableLine(line: string) {
  return line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => stripMarkdown(cell.trim()))
    .filter(Boolean);
}

function ReleaseSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1].map((item) => (
        <div
          key={item}
          className="rounded-xl border border-[#3B82F6]/15 bg-white p-5 dark:bg-slate-950"
        >
          <div className="h-5 w-24 rounded bg-[#DBEAFE]" />
          <div className="mt-4 h-6 w-1/2 rounded bg-[#DBEAFE]" />
          <div className="mt-3 h-4 w-2/3 rounded bg-[#DBEAFE]" />
          <div className="mt-5 h-24 rounded bg-[#EFF6FF]" />
        </div>
      ))}
    </div>
  );
}
