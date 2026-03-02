# Cloudflare Pages "Unknown Error" 解决方案

## 问题原因
Cloudflare 连接 GitHub 时出现 "Unknown error occurred" 通常是因为：
1. GitHub 授权权限不足
2. 仓库是私有的但授权时未勾选
3. Cloudflare 与 GitHub 的连接超时

---

## 方案 1: 重新授权 GitHub（推荐）

### 步骤 1: 撤销现有授权
1. 访问 https://github.com/settings/applications
2. 找到 "Cloudflare Pages"
3. 点击 **Revoke**

### 步骤 2: 重新授权
1. 回到 Cloudflare Pages
2. 点击 **Create a project**
3. 点击 **Connect GitHub**
4. 授权时务必勾选:
   - ✅ **Repositories** (访问仓库)
   - ✅ **Workflows** (如果是私有仓库)
   - ✅ 选择 `canchange-web` 仓库

---

## 方案 2: 直接上传（绕过 GitHub）

不需要 GitHub，直接上传构建文件：

### 步骤 1: 准备构建文件
构建文件已生成在 `out/` 目录

### 步骤 2: Cloudflare 直接上传
1. 访问 https://dash.cloudflare.com
2. Pages → Create a project
3. 选择 **Upload assets** (不是 Connect to Git)
4. 上传 `canchange-web-build.zip` 或整个 `out/` 文件夹
5. 项目名称: `canchange-web`
6. 点击 **Deploy**

---

## 方案 3: 使用 Wrangler CLI

### 安装 Wrangler
```bash
npm install -g wrangler
```

### 登录 Cloudflare
```bash
npx wrangler login
```

### 创建 Pages 项目
```bash
cd C:\Users\pc\Desktop\canchange-web-deploy
npx wrangler pages project create canchange-web
```

### 部署
```bash
npx wrangler pages deploy out --project-name=canchange-web
```

---

## 方案 4: 使用 GitLab 替代

如果 GitHub 一直报错，可以临时用 GitLab：

1. 访问 https://gitlab.com
2. 创建新项目，导入 GitHub 仓库
3. Cloudflare Pages 选择 GitLab 连接
4. 部署

---

## 最简单的解决方案

### 使用 Vercel + 国内 CDN（保持现状）

既然代码已在 Vercel，添加国内 CDN 加速：

1. 在 Vercel 绑定自定义域名（如 `www.canchange.cn`）
2. 使用 Cloudflare CDN 回源：
   - DNS 解析到 Cloudflare
   - Cloudflare 回源到 Vercel
   - 国内用户走 Cloudflare 节点

### 或使用 Netlify

Netlify 国内访问比 Vercel 稍好：
https://app.netlify.com/drop

直接拖拽 `out/` 文件夹即可部署

---

## 推荐操作顺序

1. **先尝试方案 2** (直接上传) - 最快
2. 如果不行，**尝试方案 3** (Wrangler CLI)
3. 如果都不行，**使用 Netlify** (https://app.netlify.com/drop)

---

需要我帮你用 Wrangler CLI 部署吗？
