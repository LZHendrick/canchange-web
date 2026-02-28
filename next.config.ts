import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出配置 - 适用于 Vercel/Netlify/Cloudflare Pages
  output: 'export',
  
  // 图片优化配置（静态导出需要禁用）
  images: {
    unoptimized: true,
  },
  
  // 禁用 trailing slash（保持 URL 简洁）
  trailingSlash: false,
  
  // 严格模式（推荐用于生产环境）
  reactStrictMode: true,
  
  // 压缩
  compress: true,
  
  // 输出目录
  distDir: 'dist',
};

export default nextConfig;
