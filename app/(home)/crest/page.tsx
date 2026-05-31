import {
  ArrowRight,
  Code2,
  Database,
  GitBranch,
  Layers,
  Monitor,
  ServerCog,
  Share2,
  ShieldCheck,
  Table,
} from "lucide-react";
import Mermaid from "@/components/Mermaid";
import { Callout } from "fumadocs-ui/components/callout";
import { Steps, Step } from "fumadocs-ui/components/steps";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Crest — 开源 BI 平台",
  description:
    "Crest v1.5.0 是面向私有化部署的开源 BI 平台，覆盖数据源、数据集、仪表盘、数据大屏、数据血缘、分享导出和平台管理。",
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
          <Image
            src="/images/crest/crest-logo-horizontal.svg"
            alt="Crest"
            width={243}
            height={52}
            priority
            className="h-10 w-auto mx-auto dark:hidden"
          />
          <Image
            src="/images/crest/crest-logo-horizontal-dark.svg"
            alt="Crest"
            width={243}
            height={52}
            className="h-10 w-auto mx-auto hidden dark:block"
          />

          <p className="mt-5 text-2xl font-bold tracking-tight text-fd-foreground">
            面向私有化部署的开源 BI 平台
          </p>
          <p className="mt-3 max-w-lg mx-auto text-base text-fd-muted-foreground leading-relaxed">
            Crest v1.5.0 面向企业内网和专有云部署，覆盖数据接入、建模、可视化、分享导出、数据血缘和平台管理。项目遵循 GPLv3，并保留 DataEase 上游许可声明。
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
            <Link
              href="/docs/crest"
              className="inline-flex h-11 items-center gap-2 rounded-xl border px-6 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
            >
              文档
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Positioning ─── */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl">
          <p className="text-lg text-fd-foreground leading-relaxed">
            Crest 覆盖完整 BI 主链路：数据源接入 → 数据集建模 → 图表配置 → 仪表盘与数据大屏 → 分享、导出和血缘追踪。系统部署在企业自有环境中，业务数据不经过第三方平台。
          </p>
          <p className="mt-4 text-base text-fd-muted-foreground leading-relaxed">
            v1.5.0 公开版本聚焦私有化 BI、平台管理、服务治理命名基线和国产密码套件适配。模板市场、SQLBot、消息中心、独立移动端入口、地图类图表运行时、外部插件市场、帮助中心和关于页未纳入当前运行范围。
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
              description="管理 MySQL、OceanBase Oracle 等常见关系型和分析型数据源。生产环境建议使用只读账号，并在保存前完成连接测试。"
            />
            <FeatureCard
              icon={<Table className="h-5 w-5" />}
              title="数据集"
              description="基于数据源进行建模，支持字段管理、计算字段、数据预览和缓存同步，供图表、仪表盘和大屏统一使用。"
            />
            <FeatureCard
              icon={<Layers className="h-5 w-5" />}
              title="仪表盘"
              description="通过图表、查询组件、联动、跳转和布局配置构建业务看板，适合经营分析、项目跟踪和管理驾驶舱。"
            />
            <FeatureCard
              icon={<Monitor className="h-5 w-5" />}
              title="数据大屏"
              description="面向会议室、展示墙和专题汇报场景，支持固定画布、图表组件、文本组件、示例资源和全屏预览。"
            />
            <FeatureCard
              icon={<GitBranch className="h-5 w-5" />}
              title="数据血缘"
              description="按字段级追踪数据源、表、字段、数据集、图表、仪表盘和数据大屏之间的上下游依赖关系。"
            />
            <FeatureCard
              icon={<Share2 className="h-5 w-5" />}
              title="分享与导出"
              description="为仪表盘和数据大屏生成访问链接，支持密码、有效期和访问控制；导出中心集中管理导出任务。"
            />
            <FeatureCard
              icon={<ShieldCheck className="h-5 w-5" />}
              title="安全与国密"
              description="支持 standard 和 sm-suite 两种加密模式。国密模式覆盖 SM2 登录传输、SM3 密码哈希和 SM4 敏感配置加密。"
            />
            <FeatureCard
              icon={<ServerCog className="h-5 w-5" />}
              title="平台管理"
              description="提供用户、组织、角色、权限、单点登录、审计日志、系统参数、站点设置和字体管理等管理员能力。"
            />
          </div>
        </div>
      </section>

      {/* ─── Architecture ─── */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
              运行架构
            </h2>
            <p className="mt-2 text-base text-fd-muted-foreground">
              前后端分离开发，后端统一打包部署；运行时由 Crest 应用和 MySQL 元数据库构成
            </p>
          </div>

          <div className="rounded-2xl border bg-fd-card/50 p-6 overflow-x-auto">
            <Mermaid
              chart={`flowchart TB
    subgraph Browser["浏览器端"]
        Vue["Vue 3 + Vite"]
        ElementPlus["Element Plus / vxe-table"]
        ECharts["ECharts / AntV G2/S2"]
        RelationGraph["Relation Graph 血缘图谱"]
    end

    subgraph Backend["Crest Server :8100"]
        SpringBoot["Spring Boot 3.5 + Java 21"]
        Security["Spring Security + JWT"]
        MyBatis["MyBatis Plus + Flyway"]
        OpenAPI["SpringDoc / Knife4j"]
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
        MetaDB[("MySQL 元数据库")]
        BizDB[("外部业务数据源")]
        File[("文件、字体和导出目录")]
    end

    Vue -->|REST API| SpringBoot
    ElementPlus --> Vue
    ECharts -->|渲染图表| Vue
    RelationGraph -->|查询血缘| RL
    SpringBoot --> Security
    SpringBoot --> MyBatis
    SpringBoot --> OpenAPI
    DS -->|JDBC| BizDB
    DT -->|查询 / 缓存同步| BizDB
    MyBatis --> MetaDB
    RL -->|读元数据| MetaDB
    EC -->|写文件| File
    JOB -->|定时任务| DT

    classDef browserLayer fill:#DBEAFE,stroke:#3B82F6,color:#1E1E24
    classDef backendLayer fill:#CFFAFE,stroke:#06B6D4,color:#1E1E24
    classDef moduleLayer fill:#DCFCE7,stroke:#22C55E,color:#1E1E24
    classDef storageLayer fill:#FEF3C7,stroke:#F59E0B,color:#1E1E24

    class Vue,ElementPlus,ECharts,RelationGraph browserLayer
    class SpringBoot,Security,MyBatis,OpenAPI backendLayer
    class DS,DT,CH,DV,RL,SH,EC,JOB moduleLayer
    class MetaDB,BizDB,File storageLayer`}
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
    participant Meta as 元数据库
    participant DB as 业务数据库

    User->>FE: 配置数据库连接
    FE->>DS: 保存数据源
    DS->>DB: JDBC 测试连接
    DB-->>DS: 连接成功
    DS->>Meta: 保存数据源配置
    DS-->>FE: 数据源列表

    User->>FE: 创建数据集
    FE->>DT: 选择表/字段
    DT->>DB: 查询表结构
    DB-->>DT: 返回字段
    DT->>Meta: 保存字段、计算字段和缓存规则
    DT-->>FE: 数据集预览

    User->>FE: 制作图表
    FE->>CH: 选数据集 + 图表类型
    CH->>DT: 查询数据集结果
    DT-->>CH: 返回聚合数据
    CH-->>FE: 渲染图表

    User->>FE: 组装仪表盘或数据大屏
    FE->>DV: 拖入图表 + 配置联动
    DV-->>FE: 预览页面
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
              字段变更前确认影响范围
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-base text-fd-muted-foreground leading-relaxed">
                修改数据库字段、数据集字段或图表口径前，可通过血缘视图查看影响范围。血缘关系按数据源、表、字段、数据集、图表、仪表盘和数据大屏分层展示，粒度可到字段级别。
              </p>
              <div className="mt-6 space-y-3">
                <FeatureItem>全局视图，呈现数据流向和资源依赖</FeatureItem>
                <FeatureItem>支持按数据源、数据集、仪表盘维度查看</FeatureItem>
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

    subgraph Dashboard["仪表盘层"]
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
                数据集可启用缓存同步。预览和图表查询可以复用缓存结果，降低对业务库的查询频率。
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
                "Spring Boot 3.5 + Java 21",
                "MyBatis Plus + Flyway",
                "Spring Security + JWT",
                "Quartz / WebSocket / OpenAPI",
              ]}
            />
            <TechStackCard
              title="前端"
              items={[
                "Vue 3.3 + Vite 6",
                "TypeScript + Pinia + Vue Router",
                "Element Plus + vxe-table",
                "ECharts 6 + AntV G2/S2",
              ]}
            />
            <TechStackCard
              title="运行与发布"
              items={[
                "MySQL 8.4.5 或外部 MySQL",
                "Docker Compose / Kubernetes Kustomize",
                "Alpine + jlink Java 21 runtime",
                "GHCR 镜像与离线包",
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
                v1.5.0 公开文档覆盖单机 Docker、离线包和 Kubernetes Kustomize 部署。默认单机形态只需要 Crest 应用容器和 MySQL 元数据库，适合内网快速落地和生产环境私有化部署。
              </p>
              <div className="mt-8">
                <Steps>
                  <Step>
                    <p className="font-medium">单机 Docker</p>
                    <p className="text-fd-muted-foreground">进入 installer 目录执行 install.sh，脚本会创建运行目录、生成密钥、启动 MySQL 和 Crest。</p>
                  </Step>
                  <Step>
                    <p className="font-medium">Kubernetes</p>
                    <p className="text-fd-muted-foreground">提供 Kustomize 清单，支持内置 MySQL 和外部 MySQL 两种部署方式。</p>
                  </Step>
                  <Step>
                    <p className="font-medium">离线包</p>
                    <p className="text-fd-muted-foreground">按 linux-amd64 和 linux-arm64 制作离线包，适合无法访问公网镜像仓库的环境。</p>
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
                    <span className="text-[#3B82F6]">cd</span>{" "}
                    <span className="text-green-600 dark:text-green-400">installer</span>
                    {"\n"}
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
                    <span className="text-fd-muted-foreground">✓ MySQL</span>
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
            Crest 使用 SpringDoc OpenAPI 和 Knife4j 维护运行时接口文档。启动后可访问 /doc.html 查看按模块分组的接口说明，或通过 /v3/api-docs 获取 OpenAPI JSON。
          </p>
          <Callout type="warn" className="mt-4">
            生产环境建议通过网关、反向代理或访问控制策略限制 /doc.html 和 /v3/api-docs。
          </Callout>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-[#3B82F6]/[0.08] via-[#3B82F6]/[0.02] to-transparent px-8 py-16 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#3B82F6]/[0.04] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <Image
            src="/images/crest/crest-mark.svg"
            alt=""
            width={57}
            height={52}
            className="h-10 w-auto mx-auto mb-5"
          />
          <h2 className="relative text-2xl font-bold tracking-tight text-fd-foreground">
            Crest 文档中心
          </h2>
          <p className="relative mt-3 max-w-md mx-auto text-base text-fd-muted-foreground">
            面向 v1.5.0 的公开文档已覆盖部署、配置、使用、管理、维护和开发扩展。
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
            <Link
              href="/docs/crest"
              className="inline-flex h-11 items-center gap-2 rounded-xl border px-6 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
            >
              文档
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/crest/crest-mark.svg"
              alt=""
              width={57}
              height={52}
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
