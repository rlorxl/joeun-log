/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
    nextScriptWorkers: true,
    target: 'serverless',
  },
};

const withMDX = require('@next/mdx')();
module.exports = withMDX(nextConfig);
