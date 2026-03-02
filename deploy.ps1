# CanChange Cloudflare 一键部署脚本
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "CanChange Cloudflare 部署工具" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# 安装 wrangler（如果未安装）
Write-Host "检查 Wrangler CLI..." -ForegroundColor Yellow
$wranglerExists = Get-Command npx wrangler -ErrorAction SilentlyContinue

if (-not $wranglerExists) {
    Write-Host "正在安装 Wrangler..." -ForegroundColor Yellow
    npm install -g wrangler
}

# 检查登录状态
Write-Host "检查登录状态..." -ForegroundColor Yellow
$whoami = npx wrangler whoami 2>&1

if ($whoami -match "not authenticated") {
    Write-Host ""
    Write-Host "首次使用需要登录 Cloudflare" -ForegroundColor Green
    Write-Host "请按回车键打开浏览器授权..."
    Read-Host
    npx wrangler login
} else {
    Write-Host "已登录: $whoami" -ForegroundColor Green
}

# 部署
Write-Host ""
Write-Host "正在部署到 Cloudflare Pages..." -ForegroundColor Yellow
npx wrangler pages deploy out --project-name=canchange-web --commit-message="Deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm')"

Write-Host ""
Write-Host "===================================" -ForegroundColor Green
Write-Host "部署命令已执行！" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green
Write-Host ""
Write-Host "部署完成后，访问地址:"
Write-Host "https://canchange-web.pages.dev" -ForegroundColor Cyan
Write-Host ""
Read-Host "按回车键退出"
