import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { docsOptions } from "../layout.config";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="crest-docs-theme">
      <DocsLayout tree={source.pageTree} tabs={false} {...docsOptions}>
        {children}
      </DocsLayout>
    </div>
  );
}
