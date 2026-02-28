# CanChange 国内部署指南

## 问题：为什么需要 VPN？

Vercel 服务器位于海外（美国），中国大陆访问可能：
- 速度慢或无法访问
- 需要代理/VPN
- DNS 污染

---

## 推荐方案（按优先级）

### 方案 1: Cloudflare Pages（推荐，免费）

**优点**：全球 CDN，中国大陆访问较好

**部署步骤**：

1. 访问 https://dash.cloudflare.com
2. 登录后点击 **Pages**
3. 点击 **Create a project**
4. 连接 GitHub 仓库 `LZHendrick/canchange-web`
5. 构建设置：
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
6. 点击 **Save and Deploy**

**自定义域名**：
- 在 Cloudflare Pages 项目设置中添加自定义域名
- 使用 Cloudflare 的 DNS，国内访问更快

---

### 方案 2: Netlify（免费）

**优点**：稳定，支持中国大陆

**部署步骤**：

1. 访问 https://app.netlify.com
2. 点击 **Add new site** → **Import an existing project**
3. 选择 GitHub 授权
4. 选择 `canchange-web` 仓库
5. 构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
6. 点击 **Deploy site**

---

### 方案 3: 国内云服务商（最稳定）

#### 阿里云 OSS + CDN

```bash
# 1. 创建 OSS Bucket（选择国内区域）
# 2. 开启静态网站托管
# 3. 上传构建文件
npm run build
ossutil cp -r out/ oss://your-bucket/
# 4. 配置 CDN 加速
```

#### 腾讯云 COS + CDN

类似阿里云，使用腾讯云控制台部署。

#### 又拍云 / 七牛云

专门提供静态资源 CDN，国内访问快。

---

### 方案 4: Vercel + 国内 CDN（保持现有）

保持 Vercel 部署，但添加国内 CDN：

1. 在 Vercel 绑定自定义域名（如 `www.canchange.cn`）
2. 使用 Cloudflare 或阿里云 CDN 回源到 Vercel
3. 国内用户访问 CDN 节点，速度提升

---

## 快速切换指南

### 从 Vercel 迁移到 Cloudflare Pages

1. 保持 GitHub 仓库不变
2. Cloudflare Pages 导入同一仓库
3. 自动部署，无需修改代码
4. 更新域名解析到 Cloudflare

### 备案提示

如果使用国内云服务商（阿里云/腾讯云）：
- 需要域名备案
- 使用 `.cn` 或已备案域名
- 海外平台（Cloudflare/Netlify/Vercel）无需备案

---

## 推荐配置

| 平台 | 国内访问 | 备案 | 费用 | 推荐度 |
|------|---------|------|------|--------|
| Cloudflare Pages | ⭐⭐⭐ | 不需要 | 免费 | ⭐⭐⭐⭐⭐ |
| Netlify | ⭐⭐⭐ | 不需要 | 免费 | ⭐⭐⭐⭐ |
| 阿里云 OSS | ⭐⭐⭐⭐⭐ | 需要 | 低 | ⭐⭐⭐⭐ |
| Vercel | ⭐ | 不需要 | 免费 | ⭐⭐ |

---

## 立即行动

**最快解决方案**：部署到 **Cloudflare Pages**

预计时间：5 分钟
新域名： `canchange-web.pages.dev`
国内访问：✅ 良好
