import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";
import {
  filterVisibleReleases,
  formatAssetSize,
  formatReleaseDate,
  getReleasePayloadFetchedAt,
  getReleaseSummary,
  normalizeReleasePayload,
  shouldFetchGithubReleases,
  sortReleaseAssets,
} from "../lib/crest-release-utils.mjs";

test("formatReleaseDate renders release time in China timezone", () => {
  assert.equal(
    formatReleaseDate("2026-05-31T17:21:21Z"),
    "2026年6月1日 01:21"
  );
});

test("formatAssetSize uses readable binary units", () => {
  assert.equal(formatAssetSize(0), "0 B");
  assert.equal(formatAssetSize(1536), "1.5 KB");
  assert.equal(formatAssetSize(10485760), "10 MB");
});

test("sortReleaseAssets puts install packages before checksum files", () => {
  const sorted = sortReleaseAssets([
    { name: "crest-offline-v1.5.0-checksums.txt" },
    { name: "crest-offline-v1.5.0-linux-arm64.tar.gz" },
    { name: "crest-offline-v1.5.0-linux-amd64.tar.gz" },
  ]);

  assert.deepEqual(
    sorted.map((asset) => asset.name),
    [
      "crest-offline-v1.5.0-linux-amd64.tar.gz",
      "crest-offline-v1.5.0-linux-arm64.tar.gz",
      "crest-offline-v1.5.0-checksums.txt",
    ]
  );
});

test("filterVisibleReleases removes draft releases", () => {
  assert.deepEqual(
    filterVisibleReleases([
      { id: 1, draft: true, tag_name: "v1.5.1" },
      { id: 2, draft: false, tag_name: "v1.5.0" },
    ]).map((release) => release.tag_name),
    ["v1.5.0"]
  );
});

test("getReleaseSummary skips markdown headings and returns first useful text", () => {
  assert.equal(
    getReleaseSummary("## 新增\n\n- 支持国密模式\n- 支持 Kubernetes 部署"),
    "支持国密模式；支持 Kubernetes 部署"
  );
});

test("getReleaseSummary skips release date lines", () => {
  assert.equal(
    getReleaseSummary(
      "# Crest v1.5.0\n\n发布日期：2026-06-01\n\n支持国密模式与离线部署。"
    ),
    "支持国密模式与离线部署。"
  );
});

test("normalizeReleasePayload accepts build snapshots and sorts public releases", () => {
  const releases = normalizeReleasePayload({
    fetchedAt: "2026-06-01T02:00:00.000Z",
    releases: [
      { id: 1, draft: false, tag_name: "v1.2.0", published_at: "2026-01-10T00:00:00Z" },
      { id: 2, draft: true, tag_name: "v1.6.0", published_at: "2026-06-10T00:00:00Z" },
      { id: 3, draft: false, tag_name: "v1.5.0", published_at: "2026-05-31T00:00:00Z" },
    ],
  });

  assert.deepEqual(
    releases.map((release) => release.tag_name),
    ["v1.5.0", "v1.2.0"]
  );
});

test("normalizeReleasePayload accepts raw GitHub release arrays", () => {
  const releases = normalizeReleasePayload([
    { id: 1, draft: false, tag_name: "v1.3.0", published_at: "2026-03-01T00:00:00Z" },
  ]);

  assert.equal(releases[0].tag_name, "v1.3.0");
});

test("getReleasePayloadFetchedAt reads snapshot time and falls back safely", () => {
  assert.equal(
    getReleasePayloadFetchedAt({ fetchedAt: "2026-06-01T02:00:00.000Z" }, 1),
    Date.parse("2026-06-01T02:00:00.000Z")
  );
  assert.equal(getReleasePayloadFetchedAt({ fetchedAt: "not-a-date" }, 7), 7);
});

test("release page does not call GitHub automatically after loading a snapshot", () => {
  assert.equal(
    shouldFetchGithubReleases({ force: false, hasResolvedSnapshot: true }),
    false
  );
  assert.equal(
    shouldFetchGithubReleases({ force: false, hasResolvedSnapshot: false }),
    true
  );
  assert.equal(
    shouldFetchGithubReleases({ force: true, hasResolvedSnapshot: true }),
    true
  );
});

test("GitHub Pages build runs the release snapshot sync", () => {
  const workflow = fs.readFileSync(".github/workflows/deploy.yml", "utf8");

  assert.match(workflow, /run:\s+pnpm build/);
  assert.doesNotMatch(workflow, /run:\s+pnpm next build/);
  assert.match(workflow, /GITHUB_TOKEN:\s+\$\{\{\s*github\.token\s*\}\}/);
  assert.match(workflow, /FORCE_JAVASCRIPT_ACTIONS_TO_NODE24:\s+true/);
});
