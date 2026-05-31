'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// ─── Brand-aligned theme variables for Mermaid base theme ───
// Using themeVariables (not themeCSS) so classDef styles take precedence.

const LIGHT_VARS = {
  primaryColor: '#EAF3FF',
  primaryTextColor: '#1E1E24',
  primaryBorderColor: '#3B82F6',
  lineColor: '#3B82F6',
  secondaryColor: '#ECFDF5',
  tertiaryColor: '#FFFBEB',
  background: '#FFFFFF',
  clusterBkg: '#F7FAFF',
  clusterBorder: '#3B82F6',
  titleColor: '#2563EB',
  edgeLabelBackground: '#FFFFFF',
  nodeBorder: '#3B82F6',
  nodeTextColor: '#1E1E24',
  mainBkg: '#EAF3FF',
  altBackground: '#F7FAFF',
  actorBorder: '#3B82F6',
  actorBkg: '#EAF3FF',
  actorTextColor: '#1E1E24',
  actorLineColor: '#3B82F6',
  signalColor: '#3B82F6',
  signalTextColor: '#1E1E24',
  labelBoxBkgColor: '#EAF3FF',
  labelBoxBorderColor: '#3B82F6',
  noteBkgColor: '#FFFBEB',
  noteBorderColor: '#FFC53D',
  noteTextColor: '#1E1E24',
  activationBkgColor: '#DBEAFE',
  activationBorderColor: '#3B82F6',
  loopTextColor: '#2563EB',
};

const DARK_VARS = {
  primaryColor: '#172554',
  primaryTextColor: '#E5F0FF',
  primaryBorderColor: '#60A5FA',
  lineColor: '#60A5FA',
  secondaryColor: '#064E3B',
  tertiaryColor: '#451A03',
  background: '#111827',
  clusterBkg: '#0F172A',
  clusterBorder: '#60A5FA',
  titleColor: '#93C5FD',
  edgeLabelBackground: '#0F172A',
  nodeBorder: '#60A5FA',
  nodeTextColor: '#E5F0FF',
  mainBkg: '#172554',
  altBackground: '#1E3A8A',
  actorBorder: '#60A5FA',
  actorBkg: '#172554',
  actorTextColor: '#E5F0FF',
  actorLineColor: '#60A5FA',
  signalColor: '#60A5FA',
  signalTextColor: '#E5F0FF',
  labelBoxBkgColor: '#172554',
  labelBoxBorderColor: '#60A5FA',
  noteBkgColor: '#451A03',
  noteBorderColor: '#FFC53D',
  noteTextColor: '#F8FAFC',
  activationBkgColor: '#1E3A8A',
  activationBorderColor: '#60A5FA',
  loopTextColor: '#93C5FD',
};

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [renderKey, setRenderKey] = useState(0);

  // Watch for dark-mode class changes on <html> and force re-render
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          setRenderKey((k) => k + 1);
          break;
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const render = async () => {
      if (!ref.current) return;
      try {
        const isDark = document.documentElement.classList.contains('dark');

        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          securityLevel: 'loose',
          themeVariables: isDark ? DARK_VARS : LIGHT_VARS,
          flowchart: {
            curve: 'basis',
            padding: 16,
            nodeSpacing: 40,
            rankSpacing: 50,
          },
          sequence: {
            actorFontSize: 14,
            noteFontSize: 13,
            messageFontSize: 14,
          },
        });

        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const result = await mermaid.render(id, chart);
        setSvg(result.svg);
      } catch (err) {
        console.error('Mermaid render error:', err);
      }
    };
    render();
  }, [chart, renderKey]);

  return (
    <div
      ref={ref}
      className="not-prose my-7 overflow-x-auto rounded-2xl border border-[#3B82F6]/15 bg-white p-5 shadow-sm dark:border-[#60A5FA]/20 dark:bg-slate-950/70"
    >
      <div
        className="flex min-w-fit justify-center [&_svg]:max-w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
