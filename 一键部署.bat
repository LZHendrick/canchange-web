@echo off
chcp 65001 >nul
title CanChange Cloudflare 一键部署
echo ==========================================
echo  CanChange Cloudflare 一键部署工具
echo ==========================================
echo.

cd /d "%~dp0"

echo [1/3] 检查 Wrangler...
npx wrangler --version >nul 2>&1
if errorlevel 1 (
    echo 正在安装 Wrangler...
    call npm install -g wrangler
)

echo.
echo [2/3] 检查登录状态...
npx wrangler whoami 2>&1 | findstr "not authenticated" >nul
if not errorlevel 1 (
    echo.
    echo ⚠️  首次使用需要登录 Cloudflare
    echo 按回车键打开浏览器授权（登录后关闭浏览器回来）...
    pause >nul
    call npx wrangler login
    echo.
    echo 授权完成后请按回车键继续部署...
    pause >nul
)

echo.
echo [3/3] 正在部署网站...
call npx wrangler pages deploy out --project-name=canchange-web --commit-datetime="%date% %time%" --branch=main

echo.
echo ==========================================
echo  ✅ 部署完成！
echo ==========================================
echo.
echo 网站地址：https://canchange-web.pages.dev
echo.
pause
