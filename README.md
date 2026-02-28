# CanChange 灿橙 - AI 数字员工平台

## 项目介绍

基于 Apple Silicon 的私有化 AI 数字员工解决方案。内置 4 位 24 小时在线的 AI 高管（CGO/CHO/COO/CLO），从获客到合规，全流程自动化运营。

## 技术栈

- Next.js 16 + React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- Zod

## 本地开发

```bash
npm install
npm run dev
```

## 构建部署

```bash
npm run build
```

静态文件输出到 `dist/` 目录。

## Vercel 部署

### 方法一：Git 集成（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 框架预设选择 "Next.js"
4. 构建命令：`npm run build`
5. 输出目录：`dist`

### 方法二：Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### 方法三：手动上传

将 `dist/` 目录内容上传到 Vercel 静态托管。

## 项目结构

```
src/
  app/              # 页面路由
    page.tsx        # 首页
    about/          # 关于我们
    cases/          # 客户案例
    configurator/   # 数字员工配置
    portal/         # 售后中心
    api/rag/        # RAG API
  components/       # 组件
    layout/         # 导航栏/页脚
    landing/        # 首页组件
  stores/           # 状态管理
public/             # 静态资源
```

## 环境变量

无需环境变量，纯前端静态部署。

## 域名配置

当前域名：https://canchange-web.vercel.app/
