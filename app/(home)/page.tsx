import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  FileText,
  Workflow,
  Code2,
  GitBranch,
  LayoutGrid,
  Link2,
  ShieldCheck,
} from "lucide-react";
import { Cards, Card } from "fumadocs-ui/components/card";
import { Steps, Step } from "fumadocs-ui/components/steps";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { Callout } from "fumadocs-ui/components/callout";

const PRODUCTS = [
  {
    id: "crest",
    name: "Crest",
    tag: "数据 BI",
    color: "#3B82F6",
    colorLight: "#EAF1FE",
    description: "数据看板与指标分析。拖拽搭建，无需写代码。",
    href: "/crest",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    id: "memorica",
    name: "Memorica",
    tag: "协同文档",
    color: "#6E62E8",
    colorLight: "#EEECFB",
    description: "团队文档与知识管理。多人协作，全文检索。",
    href: "/memorica",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "nivora",
    name: "Nivora",
    tag: "交付",
    color: "#1FB6A6",
    colorLight: "#E7F7F4",
    description: "构建、测试、部署自动串联。状态可见，支持回滚。",
    href: "/nivora",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    id: "coming",
    name: "代码库",
    tag: "即将推出",
    color: "#F5A623",
    colorLight: "#FEF3E0",
    description: "Git 托管与代码评审。分支保护，MR 工作流。",
    href: "#",
    icon: <GitBranch className="h-5 w-5" />,
  },
];

const FEATURES: Record<string, { items: string[]; image: string }> = {
  crest: {
    items: [
      "拖拽式看板，无需写代码",
      "实时指标与趋势预警",
      "一键分享给团队与领导",
    ],
    image: "/illustrations/sevoniva-crest-dashboard.svg",
  },
  memorica: {
    items: [
      "多人实时编辑与评论",
      "高亮与书签，沉淀重点",
      "全文检索，知识不丢失",
    ],
    image: "/illustrations/sevoniva-memorica-editor.svg",
  },
  nivora: {
    items: [
      "可视化流水线与状态",
      "一键回滚与审计",
      "提交即触发，自动交付",
    ],
    image: "/illustrations/sevoniva-devops-pipeline.svg",
  },
};

export default function HomePage() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#6E62E8]/[0.05] via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[#6E62E8]/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-16 lg:pt-32 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="text-center lg:text-left">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-7"
                style={{ backgroundColor: "#EEECFB", color: "#6E62E8" }}
              >
                <svg viewBox="0 0 100 100" className="h-4 w-4 flex-none">
                  <rect x="8" y="8" width="40" height="40" rx="11" fill="#3B82F6" />
                  <rect x="54" y="8" width="40" height="40" rx="11" fill="#6E62E8" />
                  <rect x="8" y="54" width="40" height="40" rx="11" fill="#F5A623" />
                  <rect x="54" y="54" width="40" height="40" rx="11" fill="#1FB6A6" transform="rotate(14 74 74)" />
                </svg>
                开源产品套件
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-fd-foreground sm:text-5xl lg:text-[3.25rem] leading-[1.08]">
                团队构建产品的一切
                <br className="hidden sm:block" />
                都在一处
              </h1>

              <p className="mt-5 max-w-lg mx-auto lg:mx-0 text-lg leading-relaxed" style={{ color: "#73717E" }}>
                Crest 数据看板、Memorica 协同文档与 Nivora 交付流水线。三个开源模块，共享账户与权限体系，可独立部署，也可组合使用。
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="#products"
                  className="group inline-flex h-12 items-center gap-2 rounded-xl px-7 text-sm font-semibold text-white transition-all hover:shadow-lg"
                  style={{ backgroundColor: "#1E1E24" }}
                >
                  浏览产品
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border px-7 text-sm font-medium text-fd-foreground transition-all hover:bg-fd-accent"
                  style={{ borderColor: "#ECECF1" }}
                >
                  <BookOpen className="h-4 w-4" />
                  阅读文档
                </Link>
              </div>
            </div>

            <div className="relative">
              <div
                className="rounded-[26px] border overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, #F7F8FC, #EEF0FA)",
                  borderColor: "#ECECF1",
                }}
              >
                <Image
                  src="/illustrations/sevoniva-hero-pro.svg"
                  alt="sevoniva 产品矩阵"
                  width={1100}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats Strip ===== */}
      <div
        className="border-y"
        style={{ backgroundColor: "#F7F8FC", borderColor: "#ECECF1" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-6 py-6">
            <StatItem value="4" label="个模块" />
            <StatItem value="1" label="套账户体系" />
            <StatItem value="∞" label="按需扩展" />
            <div className="hidden sm:block text-sm font-semibold" style={{ color: "#1E1E24" }}>
              数据 · 文档 · 交付 · 代码
            </div>
          </div>
        </div>
      </div>

      {/* ===== Product Matrix ===== */}
      <section id="products" className="container mx-auto px-4 py-24">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-fd-foreground">
            产品
          </h2>
          <p className="mt-4 text-lg" style={{ color: "#73717E" }}>
            Crest、Memorica、Nivora 三个模块共享账户与权限，可按需组合。
          </p>
        </div>

        <Cards className="grid-cols-1 sm:grid-cols-2 gap-5">
          {PRODUCTS.map((p) => (
            <Card
              key={p.id}
              href={p.href === "#" ? undefined : p.href}
              icon={
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: p.colorLight, color: p.color }}
                >
                  {p.icon}
                </span>
              }
              title={
                <span className="flex items-center gap-2.5">
                  <span className="text-lg font-bold" style={{ color: p.color }}>
                    {p.name}
                  </span>
                  {p.id !== "coming" && (
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{ backgroundColor: p.colorLight, color: p.color }}
                    >
                      {p.tag}
                    </span>
                  )}
                  {p.id === "coming" && (
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                      style={{ backgroundColor: "#1E1E24", color: "#fff" }}
                    >
                      {p.tag}
                    </span>
                  )}
                </span>
              }
              description={
                <span className="block mt-1.5" style={{ color: "#73717E" }}>
                  {p.description}
                </span>
              }
              className="group transition-all duration-200 hover:shadow-[0_20px_44px_-22px_rgba(40,40,80,0.3)] hover:-translate-y-[3px]"
            />
          ))}
        </Cards>
      </section>

      {/* ===== Product Detail Tabs ===== */}
      <section className="container mx-auto px-4 pb-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-fd-foreground">
            模块详情
          </h2>
        </div>

        <Tabs
          items={["Crest", "Memorica", "Nivora"]}
          className="rounded-[22px] border bg-fd-card/50 backdrop-blur-sm overflow-hidden"
        >
          {PRODUCTS.slice(0, 3).map((p) => {
            const feat = FEATURES[p.id];
            return (
              <Tab key={p.id}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-wider w-fit mb-5 uppercase"
                      style={{ backgroundColor: p.colorLight, color: p.color }}
                    >
                      {p.icon}
                      {p.tag}
                    </div>
                    <h3 className="text-[28px] font-bold tracking-tight text-fd-foreground mb-3">
                      {p.id === "crest" && "让数据，看得见"}
                      {p.id === "memorica" && "让知识，留得住"}
                      {p.id === "nivora" && "从提交到上线，一条流水线"}
                    </h3>
                    <p className="leading-relaxed mb-7" style={{ color: "#73717E", fontSize: "16px" }}>
                      {p.description}
                    </p>

                    <div className="space-y-3">
                      {feat.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-[15px]" style={{ color: "#3c3a45" }}>
                          <span
                            className="h-2 w-2 rounded-[3px] flex-shrink-0"
                            style={{ backgroundColor: p.color }}
                          />
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <Callout type="info" title="文档">
                        查看{" "}
                        <Link
                          href={p.href}
                          className="font-semibold underline underline-offset-2"
                          style={{ color: p.color }}
                        >
                          {p.name} 文档
                        </Link>{" "}
                        了解架构、部署与 API。
                      </Callout>
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-center p-6 lg:p-10 border-t lg:border-t-0 lg:border-l"
                    style={{
                      background: `linear-gradient(160deg, ${p.colorLight}, #fff)`,
                      borderColor: "#ECECF1",
                    }}
                  >
                    <Image
                      src={feat.image}
                      alt={`${p.name} 预览`}
                      width={720}
                      height={496}
                      className="w-full max-w-lg h-auto drop-shadow-2xl rounded-[20px]"
                    />
                  </div>
                </div>
              </Tab>
            );
          })}
        </Tabs>
      </section>

      {/* ===== Quick Start Steps ===== */}
      <section className="container mx-auto px-4 pb-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-fd-foreground">
            部署
          </h2>
          <p className="mt-4 text-lg" style={{ color: "#73717E" }}>
            三步部署到自有环境。
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Steps>
            <Step>
              <p className="font-medium">选择模块</p>
              <p className="text-sm text-fd-muted-foreground mt-1">
                确定需要部署的模块组合。
              </p>
            </Step>
            <Step>
              <p className="font-medium">阅读部署指南</p>
              <p className="text-sm text-fd-muted-foreground mt-1">
                提供 Docker Compose、Helm Chart 与裸机三种方式。
              </p>
            </Step>
            <Step>
              <p className="font-medium">执行部署</p>
              <p className="text-sm text-fd-muted-foreground mt-1">
                克隆仓库，配置环境变量，执行启动命令。
              </p>
            </Step>
          </Steps>
        </div>
      </section>

      {/* ===== Why sevoniva ===== */}
      <section
        className="border-y py-24"
        style={{ backgroundColor: "#F7F8FC", borderColor: "#ECECF1" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-fd-foreground">
              特点
            </h2>
            <p className="mt-4 text-lg" style={{ color: "#73717E" }}>
              一套体系，省去工具之间的来回切换与拼接。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <BenefitCard
              icon={<LayoutGrid className="h-5 w-5" />}
              iconBg="#EEECFB"
              iconColor="#6E62E8"
              title="统一体验"
              description="同一套设计语言与交互，换工具不换习惯。"
            />
            <BenefitCard
              icon={<Link2 className="h-5 w-5" />}
              iconBg="#EAF1FE"
              iconColor="#3B82F6"
              title="数据打通"
              description="文档引用看板、流水线回写指标，模块之间直接连通。"
            />
            <BenefitCard
              icon={<ShieldCheck className="h-5 w-5" />}
              iconBg="#E7F7F4"
              iconColor="#1FB6A6"
              title="统一治理"
              description="账号、权限、审计集中管理。"
            />
          </div>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="container mx-auto px-4 py-24">
        <div
          className="relative overflow-hidden rounded-[28px] px-8 py-20 text-center"
          style={{ backgroundColor: "#1E1E24" }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#6E62E8]/[0.08] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3B82F6]/[0.06] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl text-white mb-4">
            把团队的工具，收进一处
          </h2>
          <p className="relative max-w-lg mx-auto text-lg mb-10" style={{ color: "#B9B8C4" }}>
            开源，可自托管，按需扩展。
          </p>
          <div className="relative flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs"
              className="group inline-flex h-12 items-center gap-2 rounded-xl bg-white px-8 text-sm font-semibold text-[#1E1E24] transition-all hover:shadow-lg"
            >
              阅读文档
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="https://github.com/sevoniva/sevoniva.github.io"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 px-8 text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              <Code2 className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-fd-muted-foreground">
            © {new Date().getFullYear()} sevoniva
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
            <Link
              href="/memorica"
              className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Memorica
            </Link>
            <Link
              href="/crest"
              className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Crest
            </Link>
            <Link
              href="/nivora"
              className="text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            >
              Nivora
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm" style={{ color: "#73717E" }}>
      <span className="text-[26px] font-bold" style={{ color: "#1E1E24" }}>
        {value}
      </span>
      {label}
    </div>
  );
}

function BenefitCard({
  icon,
  iconBg,
  iconColor,
  title,
  description,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="rounded-[18px] p-6 border bg-white transition-all duration-200 hover:shadow-[0_18px_40px_-22px_rgba(40,40,80,0.3)] hover:-translate-y-[3px]"
      style={{ borderColor: "#ECECF1" }}
    >
      <div
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl mb-4"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <h4 className="text-[17px] font-bold text-fd-foreground mb-1.5">{title}</h4>
      <p className="text-[14.5px] leading-relaxed" style={{ color: "#73717E" }}>
        {description}
      </p>
    </div>
  );
}
