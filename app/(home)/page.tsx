import Link from "next/link";
import {
  ArrowRight,
  Code2,
  FileText,
  Layers,
  Palette,
  Search,
  Sparkles,
  Zap,
  Terminal,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-fd-primary/[0.07] via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-fd-primary/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 pt-36 pb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-fd-background/80 backdrop-blur-sm px-4 py-1.5 text-sm text-fd-muted-foreground mb-10 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-fd-primary" />
            <span>Fumadocs + Next.js</span>
          </div>

          <h1 className="max-w-4xl mx-auto text-5xl font-bold tracking-tight text-fd-foreground sm:text-6xl lg:text-7xl leading-[1.1]">
            Sevoniva
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-lg text-fd-muted-foreground leading-relaxed">
            技术文档站点与个人项目展示。基于 Fumadocs 和 Next.js 构建，
            支持 Markdown / MDX、全文搜索、深色模式，通过 GitHub Actions 自动部署到 GitHub Pages。
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-fd-primary px-8 text-sm font-semibold text-fd-primary-foreground transition-all hover:bg-fd-primary/90 hover:shadow-lg hover:shadow-fd-primary/20"
            >
              文档
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://github.com/sevoniva/sevoniva.github.io"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-xl border bg-fd-background px-8 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent hover:border-fd-border/80"
            >
              <Code2 className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-fd-foreground">
            技术栈
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard
            icon={<FileText className="h-5 w-5" />}
            title="Markdown & MDX"
            description="支持 Markdown 和 MDX，在文档中直接使用 React 组件"
          />
          <FeatureCard
            icon={<Palette className="h-5 w-5" />}
            title="主题"
            description="深色 / 浅色模式，跟随系统偏好自动切换"
          />
          <FeatureCard
            icon={<Zap className="h-5 w-5" />}
            title="Next.js 静态导出"
            description="静态站点，构建快，CDN 分发性能高"
          />
          <FeatureCard
            icon={<Search className="h-5 w-5" />}
            title="全文搜索"
            description="Cmd+K 唤起，支持文档标题和内容检索"
          />
          <FeatureCard
            icon={<Layers className="h-5 w-5" />}
            title="组件"
            description="Callout、Cards、Tabs、Steps、Files 等内置组件"
          />
          <FeatureCard
            icon={<Terminal className="h-5 w-5" />}
            title="GitHub Pages"
            description="push 到 main 分支自动构建并发布"
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="rounded-2xl border bg-fd-card/50 backdrop-blur-sm overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight text-fd-foreground">
                写文档和写 Markdown 一样
              </h2>
              <p className="mt-4 text-lg text-fd-muted-foreground leading-relaxed">
                没有额外学习成本。代码块自动高亮、Callout 提示框、Tabs 切换等增强功能直接写在 MDX 里即可。
              </p>
              <div className="mt-8 space-y-3">
                <FeatureItem>代码块语法高亮（Shiki）</FeatureItem>
                <FeatureItem>Tabs 多组内容切换</FeatureItem>
                <FeatureItem>Callout 提示框</FeatureItem>
                <FeatureItem>Steps 步骤指引</FeatureItem>
                <FeatureItem>自动生成右侧目录</FeatureItem>
              </div>
            </div>

            <div className="bg-fd-background border-t lg:border-t-0 lg:border-l">
              <div className="flex items-center gap-2 px-5 py-3 border-b bg-fd-muted/30">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                  <div className="h-3 w-3 rounded-full bg-green-400/80" />
                </div>
                <span className="ml-3 text-xs text-fd-muted-foreground font-mono">
                  getting-started.mdx
                </span>
              </div>
              <div className="p-5 overflow-x-auto">
                <pre className="text-sm leading-relaxed font-mono">
                  <code className="text-fd-foreground">
                    <span className="text-fd-muted-foreground">---</span>{"\n"}
                    <span className="text-fd-primary">title</span>
                    <span className="text-fd-muted-foreground">: </span>
                    <span className="text-green-600 dark:text-green-400">快速开始</span>{"\n"}
                    <span className="text-fd-muted-foreground">---</span>{"\n"}
                    {"\n"}
                    <span className="text-fd-foreground"># 欢迎使用</span>{"\n"}
                    {"\n"}
                    <span className="text-fd-primary">&lt;Callout</span>
                    <span className="text-fd-muted-foreground"> </span>
                    <span className="text-fd-primary">type</span>
                    <span className="text-fd-muted-foreground">=</span>
                    <span className="text-green-600 dark:text-green-400">&quot;info&quot;</span>
                    <span className="text-fd-primary">&gt;</span>{"\n"}
                    <span className="text-fd-foreground">  这是一个提示框</span>{"\n"}
                    <span className="text-fd-primary">&lt;/Callout&gt;</span>{"\n"}
                    {"\n"}
                    <span className="text-fd-foreground">## 安装</span>{"\n"}
                    {"\n"}
                    <span className="text-fd-muted-foreground">```bash</span>{"\n"}
                    <span className="text-fd-foreground">pnpm install</span>{"\n"}
                    <span className="text-fd-muted-foreground">```</span>{"\n"}
                    {"\n"}
                    <span className="text-fd-primary">&lt;Cards&gt;</span>{"\n"}
                    <span className="text-fd-primary">  &lt;Card</span>
                    <span className="text-fd-muted-foreground"> </span>
                    <span className="text-fd-primary">title</span>
                    <span className="text-fd-muted-foreground">=</span>
                    <span className="text-green-600 dark:text-green-400">&quot;查看文档&quot;</span>
                    <span className="text-fd-primary">&gt;</span>{"\n"}
                    <span className="text-fd-foreground">    了解更多</span>{"\n"}
                    <span className="text-fd-primary">  &lt;/Card&gt;</span>{"\n"}
                    <span className="text-fd-primary">&lt;/Cards&gt;</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-fd-primary/[0.08] via-fd-primary/[0.02] to-transparent px-8 py-20 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fd-primary/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-fd-primary/[0.04] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl text-fd-foreground">
            开始使用
          </h2>
          <p className="relative mt-4 max-w-lg mx-auto text-lg text-fd-muted-foreground">
            在 content/docs/ 下新建 .mdx 文件，写入内容，推送到 GitHub 自动部署。
          </p>
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-fd-primary px-8 text-sm font-semibold text-fd-primary-foreground transition-all hover:bg-fd-primary/90 hover:shadow-lg hover:shadow-fd-primary/20"
            >
              阅读文档
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://github.com/sevoniva/sevoniva.github.io"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-xl border bg-fd-background px-8 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
            >
              <Code2 className="h-4 w-4" />
              查看源码
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-fd-muted-foreground">
            © {new Date().getFullYear()} Sevoniva
          </p>
          <div className="flex items-center gap-6">
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
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative rounded-xl border bg-fd-background p-6 transition-all hover:shadow-lg hover:shadow-fd-primary/5 hover:border-fd-primary/20">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-fd-primary/10 text-fd-primary">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-fd-foreground mb-2">{title}</h3>
      <p className="text-sm text-fd-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-sm text-fd-muted-foreground">
      <div className="h-5 w-5 rounded-full bg-fd-primary/10 flex items-center justify-center flex-shrink-0">
        <ChevronRight className="h-3 w-3 text-fd-primary" />
      </div>
      {children}
    </div>
  );
}
