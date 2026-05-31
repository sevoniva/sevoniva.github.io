"use client";

import CrestSearchDialog from "@/components/CrestSearchDialog";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { ReactNode } from "react";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{
        SearchDialog: CrestSearchDialog,
        links: [
          ["快速开始", "/docs/crest/quick-start"],
          ["安装部署", "/docs/crest/deployment"],
          ["用户指南", "/docs/crest/user-guide"],
          ["管理员指南", "/docs/crest/admin-guide"],
          ["常见问题", "/docs/crest/faq"],
        ],
      }}
      i18n={{
        locale: "zh-CN",
        translations: {
          search: "搜索文档",
          searchNoResult: "没有找到相关内容",
          toc: "本页目录",
          tocNoHeadings: "暂无目录",
          lastUpdate: "最后更新",
          chooseLanguage: "选择语言",
          nextPage: "下一页",
          previousPage: "上一页",
          chooseTheme: "切换主题",
          editOnGithub: "在 GitHub 上编辑",
        },
      }}
    >
      {children}
    </RootProvider>
  );
}
