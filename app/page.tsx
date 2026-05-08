import Link from "next/link";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import {
  ArrowRight,
  BookOpen,
  Code2,
  FileText,
  Layers,
  Palette,
  Search,
  Sparkles,
  Zap,
} from "lucide-react";
import { Card, Cards } from "fumadocs-ui/components/card";

export default function HomePage() {
  return (
    <HomeLayout
      nav={{
        title: "Sevoniva",
        url: "/",
        transparentMode: "top",
      }}
      links={[
        {
          type: "menu",
          text: "文档",
          url: "/docs",
          items: [
            {
              text: "快速开始",
              url: "/docs/getting-started",
              icon: <BookOpen className="h-4 w-4" />,
            },
            {
              text: "组件展示",
              url: "/docs/components-showcase",
              icon: <Layers className="h-4 w-4" />,
            },
          ],
        },
        {
          type: "icon",
          text: "GitHub",
          label: "GitHub",
          icon: <Code2 className="h-4 w-4" />,
          url: "https://github.com/sevoniva/sevoniva.github.io",
          external: true,
        },
      ]}
    >
      {/* Hero */}
      <section className="relative flex flex-col items-center px-4 pt-32 pb-20 text-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-fd-primary/5 to-transparent" />

        <div className="inline-flex items-center gap-2 rounded-full border bg-fd-secondary/50 px-4 py-1.5 text-sm text-fd-muted-foreground mb-8">
          <Sparkles className="h-4 w-4" />
          <span>基于 Fumadocs + Next.js 构建</span>
        </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-fd-foreground sm:text-6xl lg:text-7xl">
          优雅、高效的
          <br />
          <span className="bg-gradient-to-r from-fd-primary to-fd-primary/60 bg-clip-text text-transparent">
            文档站点框架
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-fd-muted-foreground sm:text-xl">
          为开发者和团队打造的文档解决方案。支持 Markdown & MDX，
          内置丰富组件，一键部署到 GitHub Pages。
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/docs"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-fd-primary px-8 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
          >
            开始阅读文档
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://github.com/sevoniva/sevoniva.github.io"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-lg border bg-fd-background px-8 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
          >
            <Code2 className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            简洁美学，极致定制
          </h2>
          <p className="mt-4 text-lg text-fd-muted-foreground">
            精心设计的主题与组件，让文档也能赏心悦目
          </p>
        </div>

        <Cards className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            icon={<FileText className="h-5 w-5" />}
            title="Markdown & MDX"
          >
            原生支持 Markdown 和 MDX，直观的语法让任何人都能轻松编写文档
          </Card>
          <Card
            icon={<Palette className="h-5 w-5" />}
            title="精美主题"
          >
            内置多种配色主题，支持深色/浅色模式自动切换
          </Card>
          <Card
            icon={<Zap className="h-5 w-5" />}
            title="极速构建"
          >
            基于 Next.js 静态导出，构建速度快，访问性能优异
          </Card>
          <Card
            icon={<Search className="h-5 w-5" />}
            title="全文搜索"
          >
            内置搜索功能，快速定位文档内容
          </Card>
          <Card
            icon={<Layers className="h-5 w-5" />}
            title="丰富组件"
          >
            Callout、Cards、Tabs、Steps 等 10+ 组件开箱即用
          </Card>
          <Card
            icon={<BookOpen className="h-5 w-5" />}
            title="自动部署"
          >
            集成 GitHub Actions，推送代码即可自动部署到 GitHub Pages
          </Card>
        </Cards>
      </section>

      {/* Code Preview */}
      <section className="container mx-auto px-4 py-20">
        <div className="rounded-xl border bg-fd-card p-6 md:p-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                熟悉的语法
              </h2>
              <p className="mt-4 text-lg text-fd-muted-foreground">
                就是 Markdown，额外功能无缝融入语法中。
              </p>
              <ul className="mt-6 space-y-3 text-fd-muted-foreground">
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-fd-primary" />
                  语法高亮（Shiki 驱动）
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-fd-primary" />
                  代码块分组
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-fd-primary" />
                  Callout 提示框
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-fd-primary" />
                  卡片链接
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-fd-primary" />
                  自动生成目录
                </li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-lg border bg-fd-background">
              <div className="flex items-center gap-1.5 border-b px-4 py-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-fd-muted-foreground">
                  getting-started.mdx
                </span>
              </div>
              <pre className="p-4 text-sm leading-relaxed overflow-x-auto">
                <code>{`---
title: 快速开始
---

# 欢迎使用

<Callout type="info">
  这是一个提示框
</Callout>

## 安装

\`\`\`bash
pnpm install
\`\`\`

<Cards>
  <Card title="查看文档" href="/docs">
    了解更多
  </Card>
</Cards>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center rounded-2xl border bg-gradient-to-b from-fd-primary/5 to-transparent px-6 py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            开始使用
          </h2>
          <p className="mt-4 max-w-lg text-lg text-fd-muted-foreground">
            把普通 Markdown 转成精美文档站点，只需几分钟。
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-fd-primary px-8 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/90"
            >
              阅读文档
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://github.com/sevoniva/sevoniva.github.io"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-lg border bg-fd-background px-8 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
            >
              <Code2 className="h-4 w-4" />
              查看源码
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 mt-auto">
        <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-fd-muted-foreground">
            © {new Date().getFullYear()} Sevoniva. Built with Fumadocs.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/sevoniva/sevoniva.github.io"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              GitHub
            </a>
            <Link
              href="/docs"
              className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              文档
            </Link>
          </div>
        </div>
      </footer>
    </HomeLayout>
  );
}
