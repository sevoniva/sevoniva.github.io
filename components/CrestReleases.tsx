"use client";

import {
  CalendarDays,
  Download,
  ExternalLink,
  RefreshCw,
  Tag,
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
  normalizeReleasePayload,
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

const CACHE_KEY = "crest:github-releases:v1";
const CACHE_TTL = 15 * 60 * 1000;

function readReleaseCache(): ReleaseCache | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(CACHE_KEY);
    if (!value) return null;

    const parsed = JSON.parse(value) as ReleaseCache;
    if (!Array.isArray(parsed.releases) || !parsed.fetchedAt) return null;

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

export default function CrestReleases() {
  const [initialCache] = useState<ReleaseCache | null>(() =>
    readFreshReleaseCache()
  );
  const [releases, setReleases] = useState<GitHubRelease[]>(
    () => initialCache?.releases ?? []
  );
  const [loading, setLoading] = useState(() => !initialCache);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<number | null>(
    () => initialCache?.fetchedAt ?? null
  );
  const [source, setSource] = useState<ReleaseSource>(() =>
    initialCache ? "cache" : "none"
  );

  const newestRelease = releases[0];
  const latestVersion = newestRelease?.tag_name ?? "暂无发布版本";

  const updatedText = useMemo(() => {
    if (!fetchedAt) return "尚未同步";
    return formatReleaseDate(new Date(fetchedAt).toISOString());
  }, [fetchedAt]);

  const updatedLabel = useMemo(() => {
    if (source === "cache") return "缓存时间";
    if (source === "build") return "构建同步";
    return "同步时间";
  }, [source]);

  const loadReleases = useCallback(async (force = false) => {
    const cached = readReleaseCache();
    let hasResolvedData = false;
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
      if (!force) {
        try {
          applyPayload(await fetchBuildSnapshot(), "build");
          setLoading(false);
        } catch (cause) {
          lastError = cause;
        }
      }

      try {
        applyPayload(await fetchGithubReleases(), "github");
        return;
      } catch (cause) {
        lastError = cause;
        if (hasResolvedData) return;
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
  }, []);

  useEffect(() => {
    if (initialCache) return;

    const timeout = window.setTimeout(() => {
      void loadReleases(false);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [initialCache, loadReleases]);

  return (
    <div className="not-prose my-8 space-y-5">
      <section className="rounded-xl border bg-fd-card p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#3B82F6]/10 px-3 py-1 text-xs font-medium text-[#2563EB] dark:text-[#93C5FD]">
              <Tag className="h-3.5 w-3.5" />
              GitHub Releases
            </div>
            <h2 className="mt-3 text-xl font-semibold text-fd-foreground">
              版本发布
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-fd-muted-foreground">
              版本信息来自 Crest GitHub Releases。文档站会在构建时同步发布记录，并在访问时尝试刷新到最新内容。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void loadReleases(true)}
              disabled={refreshing}
              className="inline-flex h-10 items-center gap-2 rounded-lg border px-3 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={[
                  "h-4 w-4",
                  refreshing ? "animate-spin" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
              刷新
            </button>
            <a
              href={CREST_RELEASES_PAGE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#3B82F6] px-3 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB]"
            >
              GitHub Releases
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <ReleaseStat label="最新版本" value={latestVersion} />
          <ReleaseStat label="已展示版本" value={`${releases.length} 个`} />
          <ReleaseStat label={updatedLabel} value={updatedText} />
        </div>
      </section>

      {error ? (
        <div className="rounded-xl border border-[#FFC53D]/50 bg-[#FFFBEB] p-4 text-sm leading-6 text-[#7C4A03] dark:bg-[#451A03]/30 dark:text-[#FDE68A]">
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
        <div className="rounded-xl border bg-fd-card p-6 text-sm text-fd-muted-foreground">
          当前没有可公开展示的 Release。发布新版本后，本页会自动读取 GitHub Releases。
        </div>
      ) : null}

      <div className="space-y-4">
        {releases.map((release, index) => (
          <ReleaseItem
            key={release.id}
            release={release}
            latest={index === 0}
          />
        ))}
      </div>
    </div>
  );
}

function ReleaseStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-fd-background px-4 py-3">
      <div className="text-xs text-fd-muted-foreground">{label}</div>
      <div className="mt-1 text-sm font-semibold text-fd-foreground">
        {value}
      </div>
    </div>
  );
}

function ReleaseItem({
  latest,
  release,
}: {
  latest: boolean;
  release: GitHubRelease;
}) {
  const title = release.name || release.tag_name;
  const body = release.body?.trim() || "";
  const assets = sortReleaseAssets(release.assets);

  return (
    <article className="rounded-xl border bg-fd-background p-5 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-[#3B82F6]/10 px-2.5 py-1 text-xs font-semibold text-[#2563EB] dark:text-[#93C5FD]">
              {release.tag_name}
            </span>
            <span className="inline-flex items-center rounded-full bg-[#1FB6A6]/10 px-2.5 py-1 text-xs font-medium text-[#047A70] dark:text-[#5EEAD4]">
              {getReleaseLabel(release)}
            </span>
            {latest ? (
              <span className="inline-flex items-center rounded-full bg-[#FFC53D]/20 px-2.5 py-1 text-xs font-medium text-[#8A5A00] dark:text-[#FDE68A]">
                最新
              </span>
            ) : null}
          </div>
          <h3 className="mt-3 text-lg font-semibold text-fd-foreground">
            {title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-fd-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {release.published_at
                ? formatReleaseDate(release.published_at)
                : "发布时间未知"}
            </span>
            <span>{assets.length} 个发布文件</span>
          </div>
        </div>

        <a
          href={release.html_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
        >
          查看发布页
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <p className="mt-4 text-sm leading-6 text-fd-muted-foreground">
        {getReleaseSummary(body)}
      </p>

      <details className="mt-4 rounded-lg border bg-fd-card/60 p-4" open={latest}>
        <summary className="cursor-pointer text-sm font-semibold text-fd-foreground">
          发布说明
        </summary>
        <ReleaseBody body={body} />
      </details>

      {assets.length > 0 ? (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-fd-foreground">发布文件</h4>
          <div className="mt-2 divide-y rounded-lg border">
            {assets.map((asset) => (
              <a
                key={asset.id}
                href={asset.browser_download_url}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-1 px-3 py-3 transition-colors hover:bg-fd-accent sm:flex-row sm:items-center sm:justify-between"
              >
                <span className="inline-flex min-w-0 items-center gap-2 text-sm font-medium text-fd-foreground">
                  <Download className="h-4 w-4 shrink-0 text-[#3B82F6]" />
                  <span className="break-all">{asset.name}</span>
                </span>
                <span className="shrink-0 text-xs text-fd-muted-foreground">
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
    </article>
  );
}

function ReleaseBody({ body }: { body: string }) {
  const blocks = buildReleaseBlocks(body);

  if (blocks.length === 0) {
    return (
      <p className="mt-3 text-sm leading-6 text-fd-muted-foreground">
        该版本暂无发布说明。
      </p>
    );
  }

  return <div className="mt-3 space-y-3">{blocks}</div>;
}

function buildReleaseBlocks(body: string) {
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    const currentItems = listItems;
    listItems = [];
    blocks.push(
      <ul
        key={`list-${blocks.length}`}
        className="list-disc space-y-1 pl-5 text-sm leading-6 text-fd-muted-foreground"
      >
        {currentItems.map((item) => (
          <li key={item}>{stripMarkdown(item)}</li>
        ))}
      </ul>
    );
  };

  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) {
      flushList();
      continue;
    }

    if (line.startsWith("#")) {
      flushList();
      blocks.push(
        <h4
          key={`heading-${blocks.length}`}
          className="text-sm font-semibold text-fd-foreground"
        >
          {stripMarkdown(line.replace(/^#+\s*/, ""))}
        </h4>
      );
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      listItems.push(line.replace(/^[-*]\s+/, ""));
      continue;
    }

    flushList();
    blocks.push(
      <p
        key={`paragraph-${blocks.length}`}
        className="text-sm leading-6 text-fd-muted-foreground"
      >
        {stripMarkdown(line)}
      </p>
    );
  }

  flushList();
  return blocks;
}

function stripMarkdown(value: string) {
  return value
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

function ReleaseSkeleton() {
  return (
    <div className="space-y-4">
      {[0, 1].map((item) => (
        <div
          key={item}
          className="rounded-xl border bg-fd-background p-5 shadow-sm"
        >
          <div className="h-5 w-24 rounded bg-fd-muted" />
          <div className="mt-4 h-6 w-1/2 rounded bg-fd-muted" />
          <div className="mt-3 h-4 w-2/3 rounded bg-fd-muted" />
          <div className="mt-5 h-24 rounded bg-fd-muted" />
        </div>
      ))}
    </div>
  );
}
