import {
  ArrowRight,
  Code2,
  ExternalLink,
  FileText,
  FolderTree,
  History,
  Layers,
  Lock,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import Mermaid from "@/components/Mermaid";

export const metadata = {
  title: "Memorica — 实时协作文档编辑器",
  description:
    "基于 Yjs CRDT + TipTap + Spring Boot 的在线文档协作工具，支持多人同时编辑、版本历史、权限管理和 AI 辅助写作。",
};

export default function MemoricaPage() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-fd-primary/[0.07] via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-fd-primary/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-fd-background/80 backdrop-blur-sm px-4 py-1.5 text-sm text-fd-muted-foreground mb-8 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-fd-primary" />
            <span>开源 · 支持自托管</span>
          </div>

          <h1 className="max-w-4xl mx-auto text-5xl font-bold tracking-tight text-fd-foreground sm:text-6xl lg:text-7xl leading-[1.1]">
            Memorica
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-fd-muted-foreground leading-relaxed">
            实时协作文档编辑器
          </p>
          <p className="mt-4 max-w-xl mx-auto text-base text-fd-muted-foreground">
            基于 Yjs CRDT + TipTap + Spring Boot 构建。支持多人同时编辑同一文档，
            光标与选区实时同步，断网重连后内容自动合并。
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://memorica.sevoniva.com/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-fd-primary px-8 text-sm font-semibold text-fd-primary-foreground transition-all hover:bg-fd-primary/90 hover:shadow-lg hover:shadow-fd-primary/20"
            >
              在线体验
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/sevoniva/Memorica"
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

      {/* Screenshots */}
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-2xl border bg-fd-card/50 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b bg-fd-muted/30">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400/80" />
              <div className="h-3 w-3 rounded-full bg-[#6E62E8]/80" />
              <div className="h-3 w-3 rounded-full bg-green-400/80" />
            </div>
            <span className="ml-3 text-xs text-fd-muted-foreground font-mono">
              memorica.sevoniva.com
            </span>
          </div>
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight text-fd-foreground">
                文档库
              </h2>
              <p className="mt-4 text-lg text-fd-muted-foreground leading-relaxed">
                左侧文档树支持文件夹嵌套。右侧列表可按工作区、最近访问、收藏、共享、回收站等维度筛选。
              </p>
              <div className="mt-8 space-y-3">
                <FeatureItem>空白文档或模板新建</FeatureItem>
                <FeatureItem>文件夹拖拽整理</FeatureItem>
                <FeatureItem>搜索与快捷操作</FeatureItem>
                <FeatureItem>最近访问与收藏列表</FeatureItem>
              </div>
            </div>
            <div className="bg-fd-background border-t lg:border-t-0 lg:border-l">
              <img
                src="/images/memorica/homepage.png"
                alt="Memorica 文档库"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="rounded-2xl border bg-fd-card/50 backdrop-blur-sm overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="bg-fd-background border-b lg:border-b-0 lg:border-r">
              <img
                src="/images/memorica/editor.png"
                alt="Memorica 编辑器"
                className="w-full h-auto"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight text-fd-foreground">
                编辑器
              </h2>
              <p className="mt-4 text-lg text-fd-muted-foreground leading-relaxed">
                顶部状态栏显示协作连接状态、保存时间、在线人数。支持富文本、表格、任务清单、代码块、数学公式。
              </p>
              <div className="mt-8 space-y-3">
                <FeatureItem>多人光标与选区实时同步</FeatureItem>
                <FeatureItem>自动保存 + 手动版本快照</FeatureItem>
                <FeatureItem>图片与附件粘贴上传</FeatureItem>
                <FeatureItem>快捷键与 / 命令面板</FeatureItem>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="rounded-2xl border bg-fd-card/50 backdrop-blur-sm overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight text-fd-foreground">
                AI 助手
              </h2>
              <p className="mt-4 text-lg text-fd-muted-foreground leading-relaxed">
                选中文字后唤起 AI 面板，集成 DeepSeek。支持续写、润色、总结、解释、缩短、加长、翻译及自定义指令。
              </p>
              <div className="mt-8 space-y-3">
                <FeatureItem>选中内容直接操作</FeatureItem>
                <FeatureItem>流式输出，实时呈现结果</FeatureItem>
                <FeatureItem>一键替换原文</FeatureItem>
                <FeatureItem>自定义提示词</FeatureItem>
              </div>
            </div>
            <div className="bg-fd-background border-t lg:border-t-0 lg:border-l">
              <img
                src="/images/memorica/ai-assistant.png"
                alt="Memorica AI 助手"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-fd-foreground">
            功能
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard
            icon={<Users className="h-5 w-5" />}
            title="实时协作"
            description="多人同时编辑同一文档，光标与选区实时同步。Yjs CRDT 自动合并冲突。"
          />
          <FeatureCard
            icon={<Sparkles className="h-5 w-5" />}
            title="AI 助手"
            description="集成 DeepSeek，支持续写、润色、总结、翻译等操作。"
          />
          <FeatureCard
            icon={<History className="h-5 w-5" />}
            title="版本历史"
            description="手动保存版本快照，支持回退到任意历史状态。"
          />
          <FeatureCard
            icon={<Lock className="h-5 w-5" />}
            title="权限管理"
            description="文档可设为私有、公开或指定用户访问，控制查看与编辑权限。"
          />
          <FeatureCard
            icon={<FolderTree className="h-5 w-5" />}
            title="文件夹"
            description="支持文件夹创建与嵌套，按工作区、收藏、回收站组织文档。"
          />
          <FeatureCard
            icon={<Zap className="h-5 w-5" />}
            title="文件上传"
            description="图片与附件支持粘贴或拖拽上传，存储于 MinIO 对象存储。"
          />
        </div>
      </section>

      {/* Architecture */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-fd-foreground">
            架构
          </h2>
          <p className="mt-4 text-lg text-fd-muted-foreground max-w-xl mx-auto">
            前后端分离，三服务独立部署
          </p>
        </div>

        <div className="rounded-2xl border bg-fd-card/50 p-6 overflow-x-auto">
          <Mermaid
            chart={`flowchart TB
    subgraph Client["浏览器端"]
        React["React 19 + Vite"]
        TipTap["TipTap 3 编辑器"]
        Yjs["Yjs CRDT"]
    end

    subgraph APIServer["API 服务"]
        SpringBoot["Spring Boot 3.5 + Java 21"]
        JPA["Spring Data JPA"]
        Security["Spring Security + JWT"]
    end

    subgraph CollabServer["协作服务"]
        Hocuspocus["Hocuspocus (WebSocket)"]
        Redis["Redis Pub/Sub"]
    end

    subgraph Storage["存储层"]
        Postgres[("PostgreSQL 16")]
        MinIO[("MinIO 对象存储")]
    end

    React -->|REST API| SpringBoot
    Yjs -->|WebSocket| Hocuspocus
    Hocuspocus <--> Redis
    SpringBoot --> JPA
    JPA --> Postgres
    SpringBoot --> MinIO
    React --> MinIO

    classDef clientLayer fill:#EDE9FE,stroke:#6E62E8,color:#1E1E24
    classDef apiLayer fill:#CFFAFE,stroke:#06B6D4,color:#1E1E24
    classDef collabLayer fill:#DCFCE7,stroke:#22C55E,color:#1E1E24
    classDef storageLayer fill:#FEF3C7,stroke:#F59E0B,color:#1E1E24

    class React,TipTap,Yjs clientLayer
    class SpringBoot,JPA,Security apiLayer
    class Hocuspocus,Redis collabLayer
    class Postgres,MinIO storageLayer`}
          />
        </div>
      </section>

      {/* Collab Flow */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-fd-foreground">
            协作流程
          </h2>
          <p className="mt-4 text-lg text-fd-muted-foreground max-w-xl mx-auto">
            多用户同时编辑时的数据流
          </p>
        </div>

        <div className="rounded-2xl border bg-fd-card/50 p-6 overflow-x-auto">
          <Mermaid
            chart={`sequenceDiagram
    participant A as 用户 A
    participant B as 用户 B
    participant FE as 前端 (TipTap + Yjs)
    participant WS as Hocuspocus (WebSocket)
    participant Redis as Redis Pub/Sub

    A->>FE: 输入文字
    FE->>FE: Yjs 生成操作 (op)
    FE->>WS: 通过 WebSocket 发送 op
    WS->>Redis: 广播到所有实例
    Redis-->>WS: 其他实例接收
    WS->>B: 推送 op
    B->>FE: Yjs 自动合并，更新界面
    Note over A,B: 双方光标和选区实时可见`}
          />
        </div>
      </section>

      {/* Tech Stack */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-fd-foreground">
            技术栈
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TechStackCard
            title="前端"
            items={[
              "React 19 + TypeScript + Vite",
              "TipTap 3 (ProseMirror)",
              "Semi UI 组件库",
              "Yjs + Hocuspocus Provider",
              "Zustand 状态管理",
            ]}
          />
          <TechStackCard
            title="后端 API"
            items={[
              "Spring Boot 3.5 + Java 21",
              "Spring Security + JWT",
              "Spring Data JPA + PostgreSQL",
              "Flyway 数据库迁移",
              "Redis + MinIO",
            ]}
          />
          <TechStackCard
            title="协作与运维"
            items={[
              "Hocuspocus WebSocket 服务",
              "Redis Pub/Sub 多实例广播",
              "Docker + docker-compose",
              "Kubernetes 完整配置",
              "Prometheus + Grafana 监控",
            ]}
          />
        </div>
      </section>

      {/* Deployment */}
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-2xl border bg-fd-card/50 backdrop-blur-sm overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight text-fd-foreground">
                部署
              </h2>
              <p className="mt-4 text-lg text-fd-muted-foreground leading-relaxed">
                支持本地开发、Docker Compose、Kubernetes 三种部署方式。
              </p>
              <div className="mt-8 space-y-4">
                <div>
                  <h3 className="font-semibold text-fd-foreground">
                    本地开发
                  </h3>
                  <p className="text-sm text-fd-muted-foreground">
                    make dev 一键启动 PostgreSQL、Redis、MinIO 及全部服务
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-fd-foreground">
                    Docker Compose
                  </h3>
                  <p className="text-sm text-fd-muted-foreground">
                    开发环境 docker-compose.yml 与生产环境 docker-compose.prod.yml 分离
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-fd-foreground">
                    Kubernetes
                  </h3>
                  <p className="text-sm text-fd-muted-foreground">
                    包含滚动更新、健康探针、HPA、PDB 等生产级配置
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-fd-background border-t lg:border-t-0 lg:border-l flex items-center justify-center p-8">
              <div className="rounded-2xl border bg-fd-muted/30 p-6 w-full max-w-md">
                <div className="flex items-center gap-2 px-3 py-2 border-b bg-fd-background rounded-t-lg">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#6E62E8]/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <span className="ml-2 text-xs text-fd-muted-foreground font-mono">
                    terminal
                  </span>
                </div>
                <pre className="text-sm leading-relaxed font-mono p-4 text-fd-foreground overflow-x-auto">
                  <code>
                    <span className="text-fd-muted-foreground">$</span>{" "}
                    <span className="text-fd-primary">make</span>{" "}
                    <span className="text-green-600 dark:text-green-400">
                      dev
                    </span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">
                      Starting all services...
                    </span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">
                      ✓ PostgreSQL
                    </span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">
                      ✓ Redis
                    </span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">
                      ✓ MinIO
                    </span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">
                      ✓ Backend API
                    </span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">
                      ✓ Frontend
                    </span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">
                      ✓ Hocuspocus
                    </span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-fd-primary/[0.08] via-fd-primary/[0.02] to-transparent px-8 py-20 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fd-primary/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-fd-primary/[0.04] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl text-fd-foreground">
            在线演示
          </h2>
          <p className="relative mt-4 max-w-lg mx-auto text-lg text-fd-muted-foreground">
            演示环境已部署，注册账号即可体验协作编辑。
          </p>
          <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://memorica.sevoniva.com/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-fd-primary px-8 text-sm font-semibold text-fd-primary-foreground transition-all hover:bg-fd-primary/90 hover:shadow-lg hover:shadow-fd-primary/20"
            >
              在线体验
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/sevoniva/Memorica"
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

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-fd-muted-foreground">
            © {new Date().getFullYear()} Memorica
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/sevoniva/Memorica"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://memorica.sevoniva.com/"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Demo
            </a>
          </div>
        </div>
      </footer>
    </main>
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
      <h3 className="text-base font-semibold text-fd-foreground mb-2">
        {title}
      </h3>
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
        <ArrowRight className="h-3 w-3 text-fd-primary" />
      </div>
      {children}
    </div>
  );
}

function TechStackCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border bg-fd-background p-6">
      <h3 className="text-lg font-semibold text-fd-foreground mb-4">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="text-sm text-fd-muted-foreground flex items-start gap-2"
          >
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-fd-primary flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
