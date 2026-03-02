@echo off
chcp 65001 >nul
echo ===================================
echo CanChange Cloudflare 部署工具
echo ===================================
echo.

:: 检查是否已登录
npx wrangler whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo 正在登录 Cloudflare...
    npx wrangler login
)

echo.
echo 正在部署到 Cloudflare Pages...
npx wrangler pages deploy out --project-name=canchange-web --commit-message="Auto deploy"

echo.
echo ===================================
echo 部署完成！
echo ===================================
pause
