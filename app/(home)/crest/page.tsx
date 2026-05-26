import {
  ArrowRight,
  Code2,
  Database,
  ExternalLink,
  GitBranch,
  Layers,
  Monitor,
  Share2,
  Table,
} from "lucide-react";
import Mermaid from "@/components/Mermaid";
import { Callout } from "fumadocs-ui/components/callout";
import { Steps, Step } from "fumadocs-ui/components/steps";

export const metadata = {
  title: "Crest — 开源 BI 工具",
  description:
    "基于 DataEase 2.10.22 的 GPLv3 派生项目，面向私有化部署的 BI 工具。",
};

export default function CrestPage() {
  return (
    <main className="flex flex-col">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/[0.06] via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#3B82F6]/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 pt-28 pb-20 text-center">
          <img
            src="/images/crest/crest-logo-horizontal.svg"
            alt="Crest"
            className="h-10 mx-auto dark:hidden"
          />
          <img
            src="/images/crest/crest-logo-horizontal-dark.svg"
            alt="Crest"
            className="h-10 mx-auto hidden dark:block"
          />

          <p className="mt-5 text-2xl font-bold tracking-tight text-fd-foreground">
            数据登顶，决策有据
          </p>
          <p className="mt-3 max-w-lg mx-auto text-base text-fd-muted-foreground leading-relaxed">
            从 DataEase 2.10.22 分叉，GPLv3 开源。面向私有化部署，数据留在本地服务器，不经过第三方平台。
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/sevoniva/Crest"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#3B82F6] px-6 text-sm font-semibold text-white transition-all hover:bg-[#2563EB] hover:shadow-lg hover:shadow-[#3B82F6]/20"
            >
              <Code2 className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://github.com/sevoniva/Crest/blob/main/README.md"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl border px-6 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
            >
              文档
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Positioning ─── */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl">
          <p className="text-lg text-fd-foreground leading-relaxed">
            Crest 覆盖的数据分析链路：数据源接入 → 数据集建模 → 图表与看板 → 分享与导出。整条链路跑在你的服务器上，数据不离开本地。
          </p>
          <p className="mt-4 text-base text-fd-muted-foreground leading-relaxed">
            当前版本不包含模板市场、SQLBot、消息中心、移动端独立入口、地图类图表和外部插件。如果你需要这些功能，Crest 可能不适合你的场景。
          </p>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
              能做什么
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              icon={<Database className="h-5 w-5" />}
              title="数据源"
              description="配置数据库连接地址、用户名和密码即可接入。支持 MySQL、PostgreSQL、SQL Server、Oracle 和 OceanBase Oracle。"
            />
            <FeatureCard
              icon={<Table className="h-5 w-5" />}
              title="数据集"
              description="基于数据源建模。可进行字段筛选、添加计算字段、预览数据，并设置定时缓存同步规则。"
            />
            <FeatureCard
              icon={<Layers className="h-5 w-5" />}
              title="仪表板"
              description="拖拽式图表制作。含柱状图、折线图、饼图、交叉表、指标卡等类型，图表之间可配置联动和跳转。"
            />
            <FeatureCard
              icon={<Monitor className="h-5 w-5" />}
              title="数据大屏"
              description="全屏展示页面，适配电视、投影仪等大屏设备。用于会议室或展厅场景。"
            />
            <FeatureCard
              icon={<GitBranch className="h-5 w-5" />}
              title="数据血缘"
              description="追溯数据源、表、字段、数据集、图表、看板之间的上下游依赖关系。"
            />
            <FeatureCard
              icon={<Share2 className="h-5 w-5" />}
              title="分享与导出"
              description="为看板和大屏生成公开访问链接，可配置密码和有效期。图表和看板支持导出图片或 Excel。"
            />
          </div>
        </div>
      </section>

      {/* ─── Architecture ─── */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
              架构
            </h2>
            <p className="mt-2 text-base text-fd-muted-foreground">
              前后端分离，单机 / 分布式两种部署模式
            </p>
          </div>

          <div className="rounded-2xl border bg-fd-card/50 p-6 overflow-x-auto">
            <Mermaid
              chart={`flowchart TB
    subgraph Browser["浏览器端"]
        Vue["Vue 2 + Element UI"]
        ECharts["ECharts / AntV G2 S2"]
        RelationGraph["Relation Graph 血缘图谱"]
    end

    subgraph Backend["Crest Server :8100"]
        SpringBoot["Spring Boot 2.7 + Java"]
        Security["Spring Security + JWT"]
        MyBatis["MyBatis"]
        subgraph Modules["业务模块"]
            DS["datasource 数据源"]
            DT["dataset 数据集"]
            CH["chart 图表"]
            DV["visualization 可视化"]
            RL["relation 血缘"]
            SH["share 分享"]
            EC["exportCenter 导出"]
            JOB["job 定时同步"]
        end
    end

    subgraph Storage["存储层"]
        MySQL[("MySQL 元数据")]
        Doris[("Doris 内置数仓")]
        Redis[("Redis 缓存")]
        File[("文件存储 Excel/导出")]
    end

    Vue -->|REST API| SpringBoot
    ECharts -->|渲染图表| Vue
    RelationGraph -->|查询血缘| RL
    SpringBoot --> Security
    SpringBoot --> MyBatis
    DS -->|JDBC| MySQL
    DT -->|SQL| Doris
    RL -->|读元数据| MySQL
    EC -->|写文件| File
    SpringBoot --> Redis
    JOB -->|定时任务| DT

    classDef browserLayer fill:#DBEAFE,stroke:#3B82F6,color:#1E1E24
    classDef backendLayer fill:#CFFAFE,stroke:#06B6D4,color:#1E1E24
    classDef moduleLayer fill:#DCFCE7,stroke:#22C55E,color:#1E1E24
    classDef storageLayer fill:#FEF3C7,stroke:#F59E0B,color:#1E1E24

    class Vue,ECharts,RelationGraph browserLayer
    class SpringBoot,Security,MyBatis backendLayer
    class DS,DT,CH,DV,RL,SH,EC,JOB moduleLayer
    class MySQL,Doris,Redis,File storageLayer`}
            />
          </div>
        </div>
      </section>

      {/* ─── BI Pipeline ─── */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
              BI 分析链路
            </h2>
            <p className="mt-2 text-base text-fd-muted-foreground">
              从数据源到可视化展示的数据流
            </p>
          </div>

          <div className="rounded-2xl border bg-fd-card/50 p-6 overflow-x-auto">
            <Mermaid
              chart={`sequenceDiagram
    participant User as 用户
    participant FE as 前端 (Vue)
    participant DS as 数据源模块
    participant DT as 数据集模块
    participant CH as 图表模块
    participant DV as 可视化模块
    participant DB as 业务数据库
    participant Doris as Doris 数仓

    User->>FE: 配置数据库连接
    FE->>DS: 保存数据源
    DS->>DB: JDBC 测试连接
    DB-->>DS: 连接成功
    DS-->>FE: 数据源列表

    User->>FE: 创建数据集
    FE->>DT: 选择表/字段
    DT->>DB: 查询表结构
    DB-->>DT: 返回字段
    DT->>Doris: 同步数据 (可选缓存)
    Doris-->>DT: 缓存就绪
    DT-->>FE: 数据集预览

    User->>FE: 制作图表
    FE->>CH: 选数据集 + 图表类型
    CH->>Doris: 查询聚合数据
    Doris-->>CH: 返回结果
    CH-->>FE: 渲染图表

    User->>FE: 组装仪表板
    FE->>DV: 拖入图表 + 配置联动
    DV-->>FE: 预览仪表板
    FE->>SH: 生成分享链接
    SH-->>FE: 公开 URL`}
            />
          </div>
        </div>
      </section>

      {/* ─── Data Lineage ─── */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
              数据血缘
            </h2>
            <p className="mt-2 text-base text-fd-muted-foreground">
              改了字段，先看影响范围
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-base text-fd-muted-foreground leading-relaxed">
                修改数据库字段前，可通过血缘视图查看影响范围。血缘关系按数据源、数据集、看板等维度分层展示，粒度可到字段级别。提供图谱和分层两种可视化布局。
              </p>
              <div className="mt-6 space-y-3">
                <FeatureItem>全局视图，一眼看清数据流向</FeatureItem>
                <FeatureItem>支持按数据源、数据集、仪表板维度查看</FeatureItem>
                <FeatureItem>字段级粒度，精确定位影响范围</FeatureItem>
                <FeatureItem>图谱 / 分层 两种布局模式</FeatureItem>
              </div>
            </div>

            <div className="rounded-2xl border bg-fd-card/50 p-6 overflow-x-auto">
              <Mermaid
                chart={`flowchart LR
    subgraph Source["数据源层"]
        MySQL2["MySQL"]
        OB["OceanBase Oracle"]
        PG["PostgreSQL"]
    end

    subgraph Table["物理表层"]
        T1["订单表"]
        T2["用户表"]
        T3["商品表"]
    end

    subgraph Dataset["数据集层"]
        D1["销售数据集"]
        D2["用户数据集"]
    end

    subgraph Chart["图表层"]
        C1["月度销售趋势"]
        C2["用户增长"]
    end

    subgraph Dashboard["仪表板层"]
        Dash["销售看板"]
    end

    MySQL2 --> T1
    MySQL2 --> T2
    OB --> T3
    T1 --> D1
    T2 --> D2
    T3 --> D1
    D1 --> C1
    D2 --> C2
    C1 --> Dash
    C2 --> Dash

    classDef sourceLayer fill:#DBEAFE,stroke:#3B82F6,color:#1E1E24
    classDef tableLayer fill:#CFFAFE,stroke:#06B6D4,color:#1E1E24
    classDef datasetLayer fill:#DCFCE7,stroke:#22C55E,color:#1E1E24
    classDef chartLayer fill:#FEF3C7,stroke:#F59E0B,color:#1E1E24
    classDef dashboardLayer fill:#EDE9FE,stroke:#6E62E8,color:#1E1E24

    class MySQL2,OB,PG sourceLayer
    class T1,T2,T3 tableLayer
    class D1,D2 datasetLayer
    class C1,C2 chartLayer
    class Dash dashboardLayer`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── OceanBase Oracle ─── */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
                内置 OceanBase Oracle
              </h2>
              <p className="mt-4 text-base text-fd-muted-foreground leading-relaxed">
                内置 OceanBase Connector/J 驱动，无需额外配置即可连接 OB Oracle 模式。配置时支持{" "}
                <code className="text-sm bg-fd-muted px-1.5 py-0.5 rounded">username@tenant</code>{" "}
                和{" "}
                <code className="text-sm bg-fd-muted px-1.5 py-0.5 rounded">username@tenant#cluster</code>{" "}
                两种账号格式。
              </p>
              <p className="mt-3 text-base text-fd-muted-foreground leading-relaxed">
                数据集可启用结果缓存。预览和看板优先读取缓存数据，降低对业务库的查询频率。
              </p>
              <div className="mt-6 space-y-3">
                <FeatureItem>OB Oracle 直连</FeatureItem>
                <FeatureItem>数据集缓存</FeatureItem>
                <FeatureItem>危险 JDBC 参数自动拦截</FeatureItem>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="rounded-xl border bg-fd-muted/30 p-5 w-full max-w-sm space-y-2.5">
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-fd-background">
                  <Database className="h-5 w-5 text-[#3B82F6]" />
                  <div>
                    <div className="text-sm font-medium text-fd-foreground">MySQL</div>
                    <div className="text-xs text-fd-muted-foreground">生产数据库</div>
                  </div>
                  <div className="ml-auto h-2 w-2 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-fd-background">
                  <Database className="h-5 w-5 text-[#FFC53D]" />
                  <div>
                    <div className="text-sm font-medium text-fd-foreground">OceanBase Oracle</div>
                    <div className="text-xs text-fd-muted-foreground">报表库</div>
                  </div>
                  <div className="ml-auto h-2 w-2 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border bg-fd-background">
                  <Database className="h-5 w-5 text-[#FB5A5A]" />
                  <div>
                    <div className="text-sm font-medium text-fd-foreground">PostgreSQL</div>
                    <div className="text-xs text-fd-muted-foreground">日志库</div>
                  </div>
                  <div className="ml-auto h-2 w-2 rounded-full bg-green-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tech Stack ─── */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
              技术栈
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TechStackCard
              title="后端"
              items={[
                "Spring Boot 2.7 + Java",
                "MyBatis + MySQL / Doris",
                "Spring Security + JWT",
                "Redis 缓存",
              ]}
            />
            <TechStackCard
              title="前端"
              items={[
                "Vue 2 + Element UI",
                "ECharts + AntV G2/S2",
                "axios + Vuex",
              ]}
            />
            <TechStackCard
              title="工具链"
              items={[
                "Maven 构建 + JDK 17",
                "Swagger / OpenAPI 文档",
                "GitHub Actions CI",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ─── Deploy ─── */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
                部署
              </h2>
              <p className="mt-4 text-base text-fd-muted-foreground leading-relaxed">
                提供 standalone（单机）和 distributed（分布式）两种运行模式，均支持 Docker 和 Kubernetes 部署。
              </p>
              <div className="mt-8">
                <Steps>
                  <Step title="单机模式 standalone">
                    内置 Doris 数仓。执行 install.sh 脚本完成部署。
                  </Step>
                  <Step title="分布式模式 distributed">
                    外接 MySQL 和 Doris，适合生产环境多节点部署。
                  </Step>
                  <Step title="Kubernetes">
                    提供 Helm Chart，支持滚动更新和健康探针。
                  </Step>
                </Steps>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="rounded-2xl border bg-fd-muted/30 p-6 w-full max-w-md">
                <div className="flex items-center gap-2 px-3 py-2 border-b bg-fd-background rounded-t-lg">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                  </div>
                  <span className="ml-2 text-xs text-fd-muted-foreground font-mono">terminal</span>
                </div>
                <pre className="text-sm leading-relaxed font-mono p-4 text-fd-foreground overflow-x-auto">
                  <code>
                    <span className="text-fd-muted-foreground">$</span>{" "}
                    <span className="text-[#3B82F6]">bash</span>{" "}
                    <span className="text-green-600 dark:text-green-400">install.sh</span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">Installing Crest...</span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">✓ Docker</span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">✓ Crest Server</span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">✓ Crest Frontend</span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">✓ Ready at :8100</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── API ─── */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-base font-semibold text-fd-foreground">接口文档</h2>
          <p className="mt-1 text-sm text-fd-muted-foreground max-w-xl">
            基于 SpringDoc OpenAPI，启动后访问 /doc.html 查看交互式文档，或 GET /v3/api-docs 获取原始 JSON。
          </p>
          <Callout type="warn" className="mt-4">
            生产环境建议限制 /doc.html 访问
          </Callout>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-[#3B82F6]/[0.08] via-[#3B82F6]/[0.02] to-transparent px-8 py-16 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3B82F6]/[0.04] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <img
            src="/images/crest/crest-mark.svg"
            alt=""
            className="h-10 mx-auto mb-5"
          />
          <h2 className="relative text-2xl font-bold tracking-tight text-fd-foreground">
            数据登顶，决策有据
          </h2>
          <p className="relative mt-3 max-w-md mx-auto text-base text-fd-muted-foreground">
            私有化部署，数据不离开你的服务器。
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/sevoniva/Crest"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#3B82F6] px-6 text-sm font-semibold text-white transition-all hover:bg-[#2563EB] hover:shadow-lg hover:shadow-[#3B82F6]/20"
            >
              <Code2 className="h-4 w-4" />
              查看源码
            </a>
            <a
              href="https://github.com/sevoniva/Crest/blob/main/README.md"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl border px-6 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
            >
              文档
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/images/crest/crest-mark.svg"
              alt=""
              className="h-4 w-auto"
            />
            <span className="text-sm text-fd-muted-foreground">
              © {new Date().getFullYear()} Crest
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/sevoniva/Crest"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/sevoniva/Crest/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              GPLv3
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
    <div className="group relative rounded-xl border bg-fd-background p-6 transition-all hover:shadow-lg hover:shadow-[#3B82F6]/5 hover:border-[#3B82F6]/20">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
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
      <div className="h-5 w-5 rounded-full bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
        <span className="h-1.5 w-1.5 rounded-full bg-[#3B82F6]" />
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
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#3B82F6] flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
