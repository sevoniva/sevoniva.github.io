import { source } from "@/lib/source";

type StructuredHeading = {
  id: string;
  content: string;
};

type StructuredContent = {
  heading?: string;
  content: string;
};

type StructuredData = {
  headings?: StructuredHeading[];
  contents?: StructuredContent[];
};

type PageData = {
  title?: string;
  description?: string;
  structuredData?: StructuredData | (() => Promise<StructuredData>);
  load?: () => Promise<{ structuredData?: StructuredData }>;
};

type PageTreeNode = {
  type: string;
  name?: string;
  url?: string;
  children?: PageTreeNode[];
};

function buildBreadcrumbs() {
  const map = new Map<string, string[]>();

  function walk(nodes: PageTreeNode[] = [], trail: string[] = []) {
    for (const node of nodes) {
      if (node.type === "page" && node.url) {
        map.set(node.url, trail);
        continue;
      }

      if (node.children) {
        walk(node.children, node.name ? [...trail, node.name] : trail);
      }
    }
  }

  walk(source.pageTree.children as PageTreeNode[]);
  return map;
}

async function getStructuredData(data: PageData) {
  if (typeof data.structuredData === "function") {
    return data.structuredData();
  }

  if (data.structuredData) {
    return data.structuredData;
  }

  if (data.load) {
    const loaded = await data.load();
    return loaded.structuredData;
  }
}

export const dynamic = "force-static";

export async function GET() {
  const breadcrumbs = buildBreadcrumbs();
  const records = await Promise.all(
    source
      .getPages()
      .filter((page) => page.url.startsWith("/docs/crest"))
      .map(async (page) => {
        const data = page.data as PageData;
        const structuredData = await getStructuredData(data);

        return {
          url: page.url,
          title: data.title ?? page.url,
          description: data.description ?? "",
          breadcrumbs: breadcrumbs.get(page.url) ?? [],
          headings: structuredData?.headings ?? [],
          contents: structuredData?.contents?.map((item) => item.content) ?? [],
        };
      }),
  );

  return Response.json(records);
}
