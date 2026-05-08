import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/sevoniva-docs',
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  configPath: './source.config.ts',
});

export default withMDX(nextConfig);
