import defaultMdxComponents from "fumadocs-ui/mdx";
import Mermaid from "@/components/Mermaid";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Banner } from "fumadocs-ui/components/banner";
import { Card, Cards } from "fumadocs-ui/components/card";
import { Callout } from "fumadocs-ui/components/callout";
import { CodeBlock, CodeBlockTab, CodeBlockTabs } from "fumadocs-ui/components/codeblock";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { GithubInfo } from "fumadocs-ui/components/github-info";
import { Heading } from "fumadocs-ui/components/heading";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";

export function getMDXComponents() {
  return {
    ...defaultMdxComponents,
    Mermaid,
    // Accordion
    Accordions,
    Accordion,
    // Banner
    Banner,
    // Card
    Card,
    Cards,
    // Callout
    Callout,
    // Codeblock
    CodeBlock,
    CodeBlockTab,
    CodeBlockTabs,
    // Files
    File,
    Files,
    Folder,
    // GitHub
    GithubInfo,
    // Heading
    Heading,
    // Image
    ImageZoom,
    // TOC
    InlineTOC,
    // Steps
    Step,
    Steps,
    // Tabs
    Tab,
    Tabs,
    // Type Table
    TypeTable,
  };
}
