import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Cloud,
  Code2,
  Container,
  Cpu,
  ExternalLink,
  GitBranch,
  Layers,
  Lock,
  Server,
  Shield,
  Terminal,
  Workflow,
  XCircle,
} from "lucide-react";
import Mermaid from "@/components/Mermaid";

export const metadata = {
  title: "Nivora — DevOps Delivery Control Plane",
  description:
    "开源 DevOps 交付控制平面。控制平面与执行平面分离，Ports & Adapters 架构，Go 实现。",
};

const BRAND = "#6366F1";
const BRAND_SOFT = "#6366F1";

export default function NivoraPage() {
  return (
    <main className="flex flex-col">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#6366F1]/[0.06] via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#6366F1]/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 pt-28 pb-20 text-center">
          <div className="inline-flex items-center gap-2">
            <div
              className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: BRAND }}
            >
              N
            </div>
            <span className="text-3xl font-bold tracking-tight text-fd-foreground">
              Nivora
            </span>
          </div>

          <p className="mt-5 text-2xl font-bold tracking-tight text-fd-foreground">
            DevOps Delivery Control Plane
          </p>
          <p className="mt-3 max-w-xl mx-auto text-base text-fd-muted-foreground leading-relaxed">
            Go 实现的开源交付控制平面。与 Jenkins、Argo CD、Kubernetes
            等现有工具集成，提供统一的 delivery state、artifact traceability、policy
            enforcement 和 audit trail。
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://github.com/sevoniva/nivora"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl px-6 text-sm font-semibold text-white transition-all hover:shadow-lg hover:bg-[#4F46E5]"
              style={{ backgroundColor: BRAND }}
            >
              <Code2 className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://github.com/sevoniva/nivora/blob/main/README.md"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-xl border px-6 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
            >
              文档
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs text-fd-muted-foreground">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: BRAND }}
            />
            Beta-candidate foundation · 非生产就绪
          </div>
        </div>
      </section>

      {/* ─── Why Nivora Exists ─── */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-2xl">
          <p className="text-lg text-fd-foreground leading-relaxed">
            现代交付链路涉及 SCM、CI runner、制品仓库、策略检查、部署引擎、云目标、日志系统和审计记录。各系统独立维护各自的
            state 和 identity 语义，导致交付状态碎片化，artifact identity、approval
            record 和 rollback context 缺乏统一视图。
          </p>
          <p className="mt-4 text-base text-fd-muted-foreground leading-relaxed">
            Nivora 提供控制平面模型：PipelineRun、Release、DeploymentRun、Artifact、Environment、Policy、AuditLog。与底层工具集成，而非替代，将各系统的 delivery state 纳入统一查询和审计范围。
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          <div className="rounded-xl border p-5">
            <h3 className="text-sm font-semibold text-fd-foreground mb-3">
              现状
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-fd-muted-foreground">
                <XCircle className="h-4 w-4 mt-0.5 text-red-400 flex-shrink-0" />
                部署状态分散在各子系统
              </li>
              <li className="flex items-start gap-2 text-sm text-fd-muted-foreground">
                <XCircle className="h-4 w-4 mt-0.5 text-red-400 flex-shrink-0" />
                制品依赖 mutable tag，identity 不可追溯
              </li>
              <li className="flex items-start gap-2 text-sm text-fd-muted-foreground">
                <XCircle className="h-4 w-4 mt-0.5 text-red-400 flex-shrink-0" />
                审批和策略门控缺乏统一标准
              </li>
              <li className="flex items-start gap-2 text-sm text-fd-muted-foreground">
                <XCircle className="h-4 w-4 mt-0.5 text-red-400 flex-shrink-0" />
                回滚时上下文丢失
              </li>
            </ul>
          </div>
          <div className="rounded-xl border p-5">
            <h3 className="text-sm font-semibold text-fd-foreground mb-3">
              Nivora
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-fd-muted-foreground">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                统一 delivery timeline 查询接口
              </li>
              <li className="flex items-start gap-2 text-sm text-fd-muted-foreground">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                制品绑定不可变 digest / 签名
              </li>
              <li className="flex items-start gap-2 text-sm text-fd-muted-foreground">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                策略和审批作为一等模型实体
              </li>
              <li className="flex items-start gap-2 text-sm text-fd-muted-foreground">
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 flex-shrink-0" />
                每次部署生成完整 audit trail
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Core Architecture ─── */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
              控制平面 / 执行平面分离
            </h2>
            <p className="mt-2 text-base text-fd-muted-foreground max-w-xl mx-auto">
              控制平面负责 API、state、orchestration、policy 和 audit。执行平面负责
              job execution、log capture、heartbeat 和 runtime result reporting。API
              Server 不直接执行部署作业。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Mermaid
              chart={`flowchart TB
    subgraph CP["控制平面"]
        API["API Server"]
        ORCH["Orchestrator"]
        POLICY["Policy Engine"]
        INTEG["Integration Mgr"]
        AUDIT["Audit Service"]
        EVENT["Event Service"]
    end
    subgraph STATE["状态与存储"]
        DB[(PostgreSQL)]
        OBJ[(Object Store)]
        BUS[(Event Bus)]
    end
    API --> ORCH --> POLICY
    ORCH --> DB
    AUDIT --> DB
    EVENT --> BUS
    INTEG --> API`}
            />
            <Mermaid
              chart={`flowchart TB
    subgraph EP["执行平面"]
        RM["Runner Mgr"]
        R1["Local Runner"]
        R2["Host Runner"]
        R3["K8s Runner"]
        R4["GitOps Runner"]
        R5["Cloud Runner"]
        EX1["Shell"]
        EX2["SSH"]
        EX3["K8s Job"]
        EX4["Helm/YAML"]
        EX5["Argo CD"]
        EX6["Webhook"]
    end
    RM --> R1 & R2 & R3 & R4 & R5
    R1 --> EX1
    R2 --> EX2
    R3 --> EX3 & EX4
    R4 --> EX5
    R5 --> EX6`}
            />
            <Mermaid
              chart={`flowchart TB
    subgraph EXT["外部系统"]
        SCM["SCM<br/>GitHub/GitLab/Gitea"]
        ART["Registry<br/>Harbor/Nexus/OCI"]
        K8S["Kubernetes"]
        ARGO["Argo CD"]
        HOST["Host / VM"]
        CLOUD["Cloud<br/>AWS/Aliyun/Tencent"]
        SEC["Security<br/>Trivy/Cosign"]
        OBS["Observability<br/>OTel/Prometheus"]
    end`}
            />
          </div>
        </div>
      </section>

      {/* ─── Runner ≠ Executor ─── */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
                Runner ≠ Executor
              </h2>
              <p className="mt-4 text-base text-fd-muted-foreground leading-relaxed">
                Runner 定义作业执行的上下文和环境（who），Executor 定义具体的执行机制（how）。该分离使编排层无需为每种执行环境重写调度逻辑。
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border p-5">
                  <h3 className="text-sm font-semibold text-fd-foreground mb-3">
                    Runner
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Local Runner",
                      "Host Runner",
                      "Kubernetes Runner",
                      "GitOps Runner",
                      "Cloud Runner",
                    ].map((r) => (
                      <li
                        key={r}
                        className="flex items-center gap-2 text-sm text-fd-muted-foreground"
                      >
                        <Circle
                          className="h-2 w-2 flex-shrink-0"
                          style={{ color: BRAND }}
                        />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border p-5">
                  <h3 className="text-sm font-semibold text-fd-foreground mb-3">
                    Executor
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Shell Executor",
                      "SSH Executor",
                      "K8s Job Executor",
                      "Helm / YAML Executor",
                      "Argo CD Executor",
                      "Webhook Executor",
                    ].map((r) => (
                      <li
                        key={r}
                        className="flex items-center gap-2 text-sm text-fd-muted-foreground"
                      >
                        <Circle
                          className="h-2 w-2 flex-shrink-0"
                          style={{ color: BRAND }}
                        />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <Mermaid
              chart={`flowchart TB
    CP["Control Plane"] --> RM["Runner Manager"]
    RM --> LOCAL["Local Runner"]
    RM --> HOST["Host Runner"]
    RM --> K8S["Kubernetes Runner"]
    RM --> GITOPS["GitOps Runner"]
    RM --> CLOUD["Cloud Runner"]

    LOCAL --> SHELL["Shell Executor"]
    HOST --> SSH["SSH Executor"]
    K8S --> KJOB["K8s Job Executor"]
    K8S --> HYAML["Helm / YAML Executor"]
    GITOPS --> ARGO["Argo CD Executor"]
    CLOUD --> WEBHOOK["Webhook Executor"]

    SHELL --> RESULT["Execution Result"]
    SSH --> RESULT
    KJOB --> RESULT
    HYAML --> RESULT
    ARGO --> RESULT
    WEBHOOK --> RESULT
    RESULT --> CP`}
            />
          </div>
        </div>
      </section>

      {/* ─── Ports & Adapters ─── */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
              Ports & Adapters
            </h2>
            <p className="mt-2 text-base text-fd-muted-foreground max-w-xl mx-auto">
              外部系统通过 Port 接口接入核心。Use case 依赖 capability interface，不依赖具体厂商 SDK。
            </p>
          </div>

          <Mermaid
            chart={`flowchart LR
    subgraph CORE["Core Use Cases"]
        PIPE["Pipeline"]
        DEPLOY["Deployment"]
        ARTUC["Artifact"]
        POLICYUC["Policy"]
        RUNUC["Runner"]
    end

    subgraph PORTS["Ports"]
        SCM["SCMProvider"]
        ART["ArtifactProvider"]
        CLOUD["CloudProvider"]
        EXEC["Executor"]
        WF["WorkflowRuntime"]
        SECRET["SecretProvider"]
        POLICY["PolicyEngine"]
        BUS["EventBus"]
        OBJ["ObjectStore"]
    end

    subgraph ADAPTERS["Adapters"]
        SCMAD["GitHub / GitLab / Gitea"]
        ARTAD["Harbor / Nexus / OCI / S3"]
        CLOUDAD["AWS / Aliyun / Tencent"]
        EXECAD["Shell / SSH / K8s / Argo CD"]
        SECRETAD["Built-in / Vault / K8s"]
        POLICYAD["Built-in / OPA"]
        BUSAD["Memory / NATS"]
        OBJAD["Local / MinIO / S3"]
    end

    CORE --> PORTS
    SCM --> SCMAD
    ART --> ARTAD
    CLOUD --> CLOUDAD
    EXEC --> EXECAD
    WF --> BUSAD
    SECRET --> SECRETAD
    POLICY --> POLICYAD
    BUS --> BUSAD
    OBJ --> OBJAD`}
          />
        </div>
      </section>

      {/* ─── End-to-End Delivery Flow ─── */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
              端到端交付流
            </h2>
            <p className="mt-2 text-base text-fd-muted-foreground max-w-xl mx-auto">
              从 trigger 到 timeline 的完整 delivery lifecycle。当前实现覆盖 shell-based PipelineRun 子集。
            </p>
          </div>

          <Mermaid
            chart={`flowchart TB
    START["Git Push / Manual / API"]
    INGEST["Trigger Ingestion"]
    PLAN["Create PipelineRun"]
    SNAPSHOT["Execution Snapshot"]
    POLICY{"Pre-check Policy Gates"}
    DENIED["Record Policy Result"]
    QUEUE["Enqueue"]
    WORKER["Worker Pickup"]
    RUNTIME["Build Runtime Plan"]
    SELECT{"Select Runner"}
    RUNNER["Runner"]
    EXECUTOR["Executor"]
    LOGS["Log Capture"]
    STATUS["Persist Status"]
    EVENTS["Emit Events"]
    AUDIT["Write Audit"]
    APPROVAL{"Approval Required?"}
    DEPLOY["Create DeploymentRun"]
    MODE{"Deploy Mode"}
    VERIFY["Verify"]
    ROLLBACK{"Rollback?"}
    RB["Rollback"]
    TIMELINE["Timeline"]

    START --> INGEST --> PLAN --> SNAPSHOT --> POLICY
    POLICY -->|Denied| DENIED --> TIMELINE
    POLICY -->|Allowed| QUEUE --> WORKER --> RUNTIME --> SELECT
    SELECT --> RUNNER --> EXECUTOR --> LOGS --> STATUS --> EVENTS --> AUDIT
    AUDIT --> APPROVAL
    APPROVAL -->|No| DEPLOY
    APPROVAL -->|Yes| DEPLOY
    DEPLOY --> MODE --> VERIFY --> ROLLBACK
    ROLLBACK -->|Yes| RB --> TIMELINE
    ROLLBACK -->|No| TIMELINE`}
          />
        </div>
      </section>

      {/* ─── Domain Concepts ─── */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
              核心概念
            </h2>
            <p className="mt-2 text-base text-fd-muted-foreground max-w-xl mx-auto">
              领域模型覆盖交付全生命周期。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <ConceptCard
              icon={<GitBranch className="h-5 w-5" />}
              title="Application"
              desc="Nivora 管理的产品或服务实体"
            />
            <ConceptCard
              icon={<Layers className="h-5 w-5" />}
              title="Environment"
              desc="交付上下文（dev / staging / prod）"
            />
            <ConceptCard
              icon={<Workflow className="h-5 w-5" />}
              title="Pipeline"
              desc="可复用的 stage / job / step 定义"
            />
            <ConceptCard
              icon={<Cpu className="h-5 w-5" />}
              title="PipelineRun"
              desc="Pipeline 的一次执行实例"
            />
            <ConceptCard
              icon={<Container className="h-5 w-5" />}
              title="Release"
              desc="版本化交付意图，关联不可变制品"
            />
            <ConceptCard
              icon={<Cloud className="h-5 w-5" />}
              title="DeploymentRun"
              desc="发布或部署计划的一次执行"
            />
            <ConceptCard
              icon={<Server className="h-5 w-5" />}
              title="Runner"
              desc="接收并执行作业的组件"
            />
            <ConceptCard
              icon={<Terminal className="h-5 w-5" />}
              title="Executor"
              desc="Runner 使用的具体执行机制"
            />
            <ConceptCard
              icon={<Shield className="h-5 w-5" />}
              title="Policy"
              desc="允许、拒绝或要求审批的门控"
            />
            <ConceptCard
              icon={<Lock className="h-5 w-5" />}
              title="AuditLog"
              desc="关键操作的持久化记录"
            />
            <ConceptCard
              icon={<ArrowRight className="h-5 w-5" />}
              title="Event"
              desc="交付生命周期中的运行时事件"
            />
            <ConceptCard
              icon={<Code2 className="h-5 w-5" />}
              title="LogChunk"
              desc="有序的 stdout / stderr 日志段"
            />
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
            <p className="mt-2 text-base text-fd-muted-foreground max-w-xl mx-auto">
              Go 1.22，最小化外部依赖。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <TechStackCard
              title="核心"
              items={[
                "Go 1.22",
                "go-chi/chi (HTTP router)",
                "spf13/cobra (CLI)",
                "log/slog (structured logging)",
              ]}
            />
            <TechStackCard
              title="存储"
              items={[
                "jackc/pgx (PostgreSQL)",
                "goose / golang-migrate (migrations)",
                "S3 / MinIO / local (object store)",
                "Memory / NATS (event bus)",
              ]}
            />
            <TechStackCard
              title="协议"
              items={[
                "REST + OpenAPI",
                "AsyncAPI (events)",
                "Protobuf (gRPC)",
                "CloudEvents (envelopes)",
              ]}
            />
          </div>

          <div className="mt-8 max-w-3xl mx-auto rounded-xl border p-5">
            <h3 className="text-sm font-semibold text-fd-foreground mb-3">
              依赖原则
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FeatureItem>优先使用标准库</FeatureItem>
              <FeatureItem>复用现有依赖</FeatureItem>
              <FeatureItem>新增依赖须说明必要性</FeatureItem>
              <FeatureItem>不为 trivial helpers 引入包</FeatureItem>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Multi-Binary Architecture ─── */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
                模块化单体
              </h2>
              <p className="mt-4 text-base text-fd-muted-foreground leading-relaxed">
                以模块化单体架构起步，内部边界稳定后支持服务拆分。四个二进制对应四个独立运行时角色。
              </p>
              <div className="mt-8 space-y-4">
                <BinaryCard
                  name="nivora-server"
                  role="API Server"
                  desc="控制平面入口。REST / gRPC API、state management、policy decision、audit logging。"
                />
                <BinaryCard
                  name="nivora-worker"
                  role="Worker"
                  desc="消费队列中的 PipelineRun，构建 runtime plan，分发给 Runner。"
                />
                <BinaryCard
                  name="nivora-runner"
                  role="Runner"
                  desc="接收作业，委托 Executor 执行，上报 logs、heartbeats 和 status。"
                />
                <BinaryCard
                  name="nivora"
                  role="CLI"
                  desc="本地操作入口。pipeline run、deployment plan、release deploy。"
                />
              </div>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="text-sm font-semibold text-fd-foreground mb-4">
                目录结构
              </h3>
              <div className="font-mono text-sm space-y-2 text-fd-muted-foreground">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: BRAND }}
                  />
                  <span>cmd/ — binary entrypoints</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: BRAND }}
                  />
                  <span>internal/domain/ — pure domain models</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: BRAND }}
                  />
                  <span>internal/usecase/ — business orchestration</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: BRAND }}
                  />
                  <span>internal/ports/ — external capability interfaces</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: BRAND }}
                  />
                  <span>internal/adapters/ — external system implementations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: BRAND }}
                  />
                  <span>internal/infra/ — technical infrastructure</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: BRAND }}
                  />
                  <span>internal/api/ — HTTP / gRPC transport</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t">
                <h3 className="text-sm font-semibold text-fd-foreground mb-2">
                  分层规则
                </h3>
                <p className="text-sm text-fd-muted-foreground leading-relaxed">
                  Domain 定义含义。Use case 定义编排。Ports 定义契约。Adapters
                  实现外部集成。Infra 提供技术管道。API 处理传输。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Capability Boundary ─── */}
      <section className="border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
              当前能力状态
            </h2>
            <p className="mt-2 text-base text-fd-muted-foreground max-w-xl mx-auto">
              当前处于 beta-candidate foundation 阶段。以下列表反映代码和文档的实际状态，不夸大已完成功能。
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            <CapabilityRow
              name="Backend Skeleton"
              status="done"
              detail="Completed"
            />
            <CapabilityRow
              name="Architecture Guardrails"
              status="done"
              detail="Module boundaries, verification scripts"
            />
            <CapabilityRow
              name="PipelineRun Runtime"
              status="done"
              detail="Shell executor, logs, status transitions, audit"
            />
            <CapabilityRow
              name="K8s YAML Planning / Dry-run"
              status="progress"
              detail="Phase 2.1: non-destructive planning, local no-op apply"
            />
            <CapabilityRow
              name="Artifact Binding / OCI Digest"
              status="progress"
              detail="Phase 2.5: digest resolution foundation"
            />
            <CapabilityRow
              name="Argo CD GitOps"
              status="progress"
              detail="Phase 2.6: adapter foundation"
            />
            <CapabilityRow
              name="DevSecOps Policy Gates"
              status="planned"
              detail="Phase 3.0"
            />
            <CapabilityRow
              name="AuthN / AuthZ / RBAC"
              status="planned"
              detail="Phase 3.2"
            />
            <CapabilityRow
              name="Approvals / Change Windows / Notifications"
              status="planned"
              detail="Phase 3.3"
            />
            <CapabilityRow
              name="Visualization API / Web UI"
              status="planned"
              detail="Phase 4.0-4.1: read-model API, minimal frontend"
            />
            <CapabilityRow
              name="Production Multi-cloud Adapters"
              status="planned"
              detail="Future phase"
            />
            <CapabilityRow
              name="Full DevSecOps Integration"
              status="planned"
              detail="Future phase"
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
                支持 Docker Compose、Helm Chart 和 Kubernetes manifests。当前阶段适用于本地开发和评估。
              </p>
              <div className="mt-8 space-y-4">
                <div>
                  <h3 className="font-semibold text-fd-foreground">
                    Docker Compose
                  </h3>
                  <p className="text-sm text-fd-muted-foreground">
                    Server + worker + runner + PostgreSQL 本地组合。
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-fd-foreground">
                    Helm Chart
                  </h3>
                  <p className="text-sm text-fd-muted-foreground">
                    Production profile、rolling update、health probes。
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-fd-foreground">
                    Kubernetes
                  </h3>
                  <p className="text-sm text-fd-muted-foreground">
                    Native YAML manifests。
                  </p>
                </div>
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
                  <span className="ml-2 text-xs text-fd-muted-foreground font-mono">
                    terminal
                  </span>
                </div>
                <pre className="text-sm leading-relaxed font-mono p-4 text-fd-foreground overflow-x-auto">
                  <code>
                    <span className="text-fd-muted-foreground">$</span>{" "}
                    <span style={{ color: BRAND }}>make</span>{" "}
                    <span className="text-green-600 dark:text-green-400">
                      build
                    </span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">
                      go build ./cmd/...
                    </span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">
                      ✓ nivora-server
                    </span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">
                      ✓ nivora-worker
                    </span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">
                      ✓ nivora-runner
                    </span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">
                      ✓ nivora CLI
                    </span>
                    {"\n\n"}
                    <span className="text-fd-muted-foreground">$</span>{" "}
                    <span style={{ color: BRAND }}>make</span>{" "}
                    <span className="text-green-600 dark:text-green-400">
                      run-server
                    </span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">
                      Server ready at :8080
                    </span>
                    {"\n\n"}
                    <span className="text-fd-muted-foreground">$</span>{" "}
                    <span style={{ color: BRAND }}>go</span>{" "}
                    <span className="text-green-600 dark:text-green-400">
                      run
                    </span>{" "}
                    <span className="text-fd-muted-foreground">
                      ./cmd/nivora pipeline run --local
                    </span>
                    {"\n"}
                    <span className="text-fd-muted-foreground">
                      examples/pipelines/simple-shell.yaml
                    </span>
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-fd-foreground">
                API
              </h2>
              <p className="mt-1 text-sm text-fd-muted-foreground max-w-xl">
                REST + OpenAPI。未实现端点返回{" "}
                <code className="text-xs bg-fd-muted/50 px-1 py-0.5 rounded">
                  not_implemented
                </code>{" "}
                结构化响应，不返回 mock 数据。
              </p>
            </div>
            <div className="text-xs text-fd-muted-foreground bg-fd-muted/50 px-3 py-1.5 rounded-full whitespace-nowrap">
              /api/v1/orgs · /projects · /pipelines · /pipeline-runs ·
              /deployments · /releases
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-[#6366F1]/[0.08] via-[#6366F1]/[0.02] to-transparent px-8 py-16 text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#6366F1]/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6366F1]/[0.04] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-5"
              style={{ backgroundColor: BRAND }}
            >
              N
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-fd-foreground">
              统一的交付控制平面
            </h2>
            <p className="relative mt-3 max-w-md mx-auto text-base text-fd-muted-foreground">
              集成现有工具链，提供 delivery state、artifact traceability、policy enforcement 和 audit trail 的统一视图。
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://github.com/sevoniva/nivora"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-xl px-6 text-sm font-semibold text-white transition-all hover:shadow-lg hover:bg-[#4F46E5]"
                style={{ backgroundColor: BRAND }}
              >
                <Code2 className="h-4 w-4" />
                源码
              </a>
              <a
                href="https://github.com/sevoniva/nivora/blob/main/PROJECT_CHARTER.md"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-xl border px-6 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
              >
                章程
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded flex items-center justify-center text-white text-[8px] font-bold"
              style={{ backgroundColor: BRAND }}
            >
              N
            </div>
            <span className="text-sm text-fd-muted-foreground">
              © {new Date().getFullYear()} Nivora
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/sevoniva/nivora"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/sevoniva/nivora/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              License
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ConceptCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-xl border bg-fd-background p-5 transition-all hover:shadow-lg hover:border-[#6366F1]/20">
      <div
        className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg text-white"
        style={{ backgroundColor: BRAND_SOFT }}
      >
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-fd-foreground">{title}</h3>
      <p className="mt-1 text-xs text-fd-muted-foreground leading-relaxed">
        {desc}
      </p>
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
            <span
              className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: BRAND }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BinaryCard({
  name,
  role,
  desc,
}: {
  name: string;
  role: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border p-4 transition-all hover:border-[#6366F1]/20">
      <div className="flex items-center gap-3">
        <div
          className="h-8 w-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: BRAND }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 className="text-sm font-semibold text-fd-foreground font-mono">
            {name}
          </h4>
          <p className="text-xs text-fd-muted-foreground">{role}</p>
        </div>
      </div>
      <p className="mt-2 text-sm text-fd-muted-foreground leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-sm text-fd-muted-foreground">
      <div
        className="h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${BRAND}15` }}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: BRAND }}
        />
      </div>
      {children}
    </div>
  );
}

function CapabilityRow({
  name,
  status,
  detail,
}: {
  name: string;
  status: "done" | "progress" | "planned";
  detail: string;
}) {
  const config = {
    done: {
      bg: "bg-green-500/10",
      text: "text-green-600 dark:text-green-400",
      label: "已完成",
      dot: "bg-green-500",
    },
    progress: {
      bg: "bg-amber-500/10",
      text: "text-amber-600 dark:text-amber-400",
      label: "进行中",
      dot: "bg-amber-500",
    },
    planned: {
      bg: "bg-fd-muted/30",
      text: "text-fd-muted-foreground",
      label: "规划中",
      dot: "bg-fd-muted-foreground/40",
    },
  };
  const c = config[status];
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-lg border px-4 py-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className={`h-2 w-2 rounded-full flex-shrink-0 ${c.dot}`} />
        <span className="text-sm font-medium text-fd-foreground">{name}</span>
      </div>
      <span
        className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 w-fit ${c.bg} ${c.text}`}
      >
        {c.label}
      </span>
      <span className="text-sm text-fd-muted-foreground sm:text-right sm:max-w-xs truncate">
        {detail}
      </span>
    </div>
  );
}
