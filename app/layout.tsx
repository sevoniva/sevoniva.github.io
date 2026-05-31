import type { Metadata } from "next";
import AppProvider from "@/components/AppProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "sevoniva",
  description: "One place to build, analyze & collaborate.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
