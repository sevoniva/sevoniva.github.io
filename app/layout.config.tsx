import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: "Sevoniva Docs",
  },
  links: [
    {
      text: "文档",
      url: "/docs",
      active: "nested-url",
    },
  ],
};
