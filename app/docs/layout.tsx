import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "../layout.config";
import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions}
      className="dark:bg-[#151419] dark:[--color-fd-background:#151419] [--color-fd-primary:var(--color-brand)]"
    >
      {children}
    </DocsLayout>
  );
}
