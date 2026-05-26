'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// ─── Brand-aligned theme variables for Mermaid base theme ───
// Using themeVariables (not themeCSS) so classDef styles take precedence.

const LIGHT_VARS = {
  primaryColor: '#EDE9FE',
  primaryTextColor: '#1E1E24',
  primaryBorderColor: '#6E62E8',
  lineColor: '#8B80F0',
  secondaryColor: '#F5F3FF',
  tertiaryColor: '#FAFAFF',
  background: '#F4F4F7',
  clusterBkg: '#F5F3FF',
  clusterBorder: '#6E62E8',
  titleColor: '#6E62E8',
  edgeLabelBackground: '#EDE9FE',
  nodeBorder: '#6E62E8',
  nodeTextColor: '#1E1E24',
  mainBkg: '#EDE9FE',
  altBackground: '#DDD6FE',
  actorBorder: '#6E62E8',
  actorBkg: '#EDE9FE',
  actorTextColor: '#1E1E24',
  actorLineColor: '#8B80F0',
  signalColor: '#8B80F0',
  signalTextColor: '#1E1E24',
  labelBoxBkgColor: '#EDE9FE',
  labelBoxBorderColor: '#6E62E8',
  noteBkgColor: '#F5F3FF',
  noteBorderColor: '#6E62E8',
  noteTextColor: '#1E1E24',
  activationBkgColor: '#DDD6FE',
  activationBorderColor: '#6E62E8',
  loopTextColor: '#6E62E8',
};

const DARK_VARS = {
  primaryColor: '#2A2640',
  primaryTextColor: '#E2E0F0',
  primaryBorderColor: '#8B80F0',
  lineColor: '#8B80F0',
  secondaryColor: '#1E1B33',
  tertiaryColor: '#15122B',
  background: '#151419',
  clusterBkg: '#1E1B33',
  clusterBorder: '#8B80F0',
  titleColor: '#A29BFE',
  edgeLabelBackground: '#2A2640',
  nodeBorder: '#8B80F0',
  nodeTextColor: '#E2E0F0',
  mainBkg: '#2A2640',
  altBackground: '#3D3659',
  actorBorder: '#8B80F0',
  actorBkg: '#2A2640',
  actorTextColor: '#E2E0F0',
  actorLineColor: '#8B80F0',
  signalColor: '#8B80F0',
  signalTextColor: '#E2E0F0',
  labelBoxBkgColor: '#2A2640',
  labelBoxBorderColor: '#8B80F0',
  noteBkgColor: '#1E1B33',
  noteBorderColor: '#8B80F0',
  noteTextColor: '#E2E0F0',
  activationBkgColor: '#3D3659',
  activationBorderColor: '#8B80F0',
  loopTextColor: '#A29BFE',
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
      className="my-6 flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
