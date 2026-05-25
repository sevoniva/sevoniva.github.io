import { createMDX } from 'fumadocs-mdx/next';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  turbopack: {
    root,
  },
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  configPath: './source.config.ts',
});

export default withMDX(nextConfig);
