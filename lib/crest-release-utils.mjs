export const CREST_RELEASES_API_URL =
  "https://api.github.com/repos/sevoniva/Crest/releases";

export const CREST_RELEASES_PAGE_URL =
  "https://github.com/sevoniva/Crest/releases";

export const CREST_RELEASES_LOCAL_URL = "/data/crest-releases.json";

const DATE_FORMATTER = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Shanghai",
});

export function formatReleaseDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "发布时间未知";

  return DATE_FORMATTER.format(date).replace("日 ", "日 ");
}

export function formatAssetSize(size) {
  if (!Number.isFinite(size) || size <= 0) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  let value = size;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const display =
    value >= 10 || unitIndex === 0 ? Math.round(value) : value.toFixed(1);
  return `${display} ${units[unitIndex]}`;
}

export function sortReleaseAssets(assets = []) {
  return [...assets].sort((left, right) => {
    const leftRank = getAssetRank(left.name);
    const rightRank = getAssetRank(right.name);

    if (leftRank !== rightRank) return leftRank - rightRank;
    return String(left.name).localeCompare(String(right.name), "zh-CN");
  });
}

export function filterVisibleReleases(releases = []) {
  return releases.filter((release) => !release.draft);
}

export function normalizeReleasePayload(payload) {
  const releases = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.releases)
      ? payload.releases
      : null;

  if (!releases) {
    throw new Error("版本数据返回格式异常");
  }

  return filterVisibleReleases(releases).sort((left, right) => {
    const leftDate = new Date(left.published_at ?? 0).getTime();
    const rightDate = new Date(right.published_at ?? 0).getTime();
    return rightDate - leftDate;
  });
}

export function getReleasePayloadFetchedAt(payload, fallback = Date.now()) {
  if (!payload || typeof payload !== "object" || !("fetchedAt" in payload)) {
    return fallback;
  }

  const value = payload.fetchedAt;
  const time =
    typeof value === "number" ? value : new Date(String(value)).getTime();

  return Number.isFinite(time) ? time : fallback;
}

export function getReleaseSummary(body = "") {
  const lines = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith("#"))
    .slice(0, 3)
    .map((line) => line.replace(/^[-*]\s+/, "").replace(/`/g, ""));

  if (lines.length === 0) return "该版本暂无发布说明。";
  return lines.join("；");
}

export function getReleaseLabel(release) {
  if (release?.prerelease) return "预发布";
  return "正式版";
}

function getAssetRank(name = "") {
  const lowerName = name.toLowerCase();

  if (lowerName.includes("linux-amd64")) return 10;
  if (lowerName.includes("linux-arm64")) return 20;
  if (lowerName.includes("checksum")) return 90;
  if (lowerName.includes("sha256")) return 91;

  return 50;
}
