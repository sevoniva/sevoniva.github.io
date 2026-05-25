import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";

export default function HomeRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HomeLayout
      {...baseOptions}
      className="dark:bg-[#151419] dark:[--color-fd-background:#151419] [--color-fd-primary:var(--color-brand)]"
    >
      {children}
    </HomeLayout>
  );
}
