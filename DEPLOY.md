# CanChange 灿橙 - 部署指南

## 📦 项目信息

- **项目名称**: canchange-web
- **域名**: https://canchange-web.vercel.app/
- **框架**: Next.js 16 + React 19
- **部署方式**: 静态导出 (Static Export)

## 🚀 快速部署到 Vercel

### 方法 1: Vercel CLI (推荐)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 进入项目目录
cd canchange-web-deploy

# 登录 Vercel
vercel login

# 部署到生产环境
vercel --prod
```

### 方法 2: GitHub + Vercel 自动部署

1. **创建 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/canchange-web.git
   git push -u origin main
   ```

2. **Vercel 配置**
   - 登录 https://vercel.com/dashboard
   - 点击 "Add New Project"
   - 导入 GitHub 仓库
   - 框架预设: Next.js
   - 构建命令: `npm run build`
   - 输出目录: `dist`
   - 点击 Deploy

### 方法 3: 手动上传

1. 先本地构建:
   ```bash
   npm install
   npm run build
   ```

2. 将 `dist/` 文件夹内容上传到 Vercel

## ⚙️ 环境要求

- Node.js >= 20.0.0
- npm 或 yarn

## 📁 项目结构

```
canchange-web-deploy/
├── src/
│   ├── app/                    # 页面路由
│   │   ├── page.tsx            # 首页 (算力水晶舱)
│   │   ├── layout.tsx          # 根布局
│   │   ├── globals.css         # 全局样式
│   │   ├── about/              # 关于我们
│   │   ├── cases/              # 客户案例
│   │   ├── configurator/       # 数字员工配置
│   │   └── portal/             # 售后中心
│   ├── components/
│   │   ├── layout/Navbar.tsx   # 导航栏 + 页脚
│   │   └── landing/Hero.tsx    # 首页 Hero
│   └── stores/
│       └── botStore.ts         # 状态管理
├── public/                     # 静态资源
├── package.json
├── next.config.ts              # Next.js 配置
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
├── vercel.json                 # Vercel 配置
└── README.md
```

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 🔧  Troubleshooting

### 构建失败

1. 确保 Node.js 版本 >= 20
   ```bash
   node -v
   ```

2. 清除缓存重新安装
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### 样式不生效

- 项目使用 Tailwind CSS v4，配置在 `globals.css` 中
- 确保 `postcss.config.mjs` 配置正确

### 图片无法显示

- 项目使用静态导出，图片已配置为 `unoptimized: true`
- 确保图片放在 `public/` 目录下

## 📞 支持

如有部署问题，请检查:
1. Vercel 构建日志
2. Node.js 版本
3. 依赖安装是否完整
