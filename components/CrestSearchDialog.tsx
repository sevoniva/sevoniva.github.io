"use client";

import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
} from "fumadocs-ui/components/dialog/search";
import type {
  SearchItemType,
  SharedProps,
} from "fumadocs-ui/components/dialog/search";
import type { SearchLink } from "fumadocs-ui/contexts/search";
import { useEffect, useMemo, useState } from "react";

type SearchRecord = {
  url: string;
  title: string;
  description: string;
  breadcrumbs: string[];
  headings: Array<{
    id: string;
    content: string;
  }>;
  contents: string[];
};

type CrestSearchDialogProps = SharedProps & {
  links?: SearchLink[];
};

type RankedRecord = SearchRecord & {
  excerpt: string;
  score: number;
};

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function includesQuery(value: string, query: string) {
  return normalize(value).includes(query);
}

function rankRecord(record: SearchRecord, query: string) {
  let score = 0;

  if (includesQuery(record.title, query)) score += 80;
  if (includesQuery(record.description, query)) score += 35;
  if (record.breadcrumbs.some((item) => includesQuery(item, query))) score += 25;
  if (record.headings.some((item) => includesQuery(item.content, query))) score += 30;
  if (record.contents.some((item) => includesQuery(item, query))) score += 12;
  if (includesQuery(record.url, query)) score += 8;

  return score;
}

function getExcerpt(record: SearchRecord, query: string) {
  const source =
    record.description ||
    record.headings.find((item) => includesQuery(item.content, query))?.content ||
    record.contents.find((item) => includesQuery(item, query)) ||
    record.headings[0]?.content ||
    "";

  if (source.length <= 88) return source;

  const normalizedSource = normalize(source);
  const index = normalizedSource.indexOf(query);
  if (index < 0) return `${source.slice(0, 88)}...`;

  const start = Math.max(0, index - 28);
  const end = Math.min(source.length, index + query.length + 58);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < source.length ? "..." : "";

  return `${prefix}${source.slice(start, end)}${suffix}`;
}

function toSearchItems(records: RankedRecord[]): SearchItemType[] {
  return records.map((record) => ({
    id: record.url,
    type: "page",
    url: record.url,
    breadcrumbs: record.breadcrumbs,
    content: (
      <span className="crest-search-result">
        <span className="crest-search-result-title">{record.title}</span>
        {record.excerpt ? (
          <span className="crest-search-result-excerpt">{record.excerpt}</span>
        ) : null}
      </span>
    ),
  }));
}

function toQuickLinks(links: SearchLink[] = []): SearchItemType[] {
  return links.map(([name, href]) => ({
    id: href,
    type: "page",
    url: href,
    breadcrumbs: ["Crest 文档"],
    content: name,
  }));
}

export default function CrestSearchDialog({
  open,
  onOpenChange,
  links,
}: CrestSearchDialogProps) {
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<SearchRecord[]>([]);

  useEffect(() => {
    if (!open || records.length > 0) return;

    let cancelled = false;

    fetch("/api/search")
      .then((response) => {
        if (!response.ok) throw new Error("Search index request failed");
        return response.json() as Promise<SearchRecord[]>;
      })
      .then((data) => {
        if (!cancelled) setRecords(data);
      });

    return () => {
      cancelled = true;
    };
  }, [open, records.length]);

  const items = useMemo<SearchItemType[]>(() => {
    const query = normalize(search.trim());
    if (!query) return toQuickLinks(links);

    return toSearchItems(
      records
        .map((record) => ({
          ...record,
          excerpt: getExcerpt(record, query),
          score: rankRecord(record, query),
        }))
        .filter((record) => record.score > 0)
        .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
        .slice(0, 12),
    );
  }, [links, records, search]);

  return (
    <SearchDialog
      onOpenChange={onOpenChange}
      onSearchChange={setSearch}
      open={open}
      search={search}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput autoFocus />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={items} />
      </SearchDialogContent>
    </SearchDialog>
  );
}
