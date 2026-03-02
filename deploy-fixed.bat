@echo off
chcp 65001 >nul
title CanChange 腾讯云部署（修正版）
echo ==========================================
echo  CanChange 腾讯云 CloudBase 部署
echo ==========================================
echo.

cd /d "%~dp0"

:: 确保使用正确的文件夹名称
if exist "out" (
    echo 检测到 out 文件夹，重命名为 dist...
    if exist "dist" rmdir /S /Q dist
    rename out dist
)

if not exist "dist\index.html" (
    echo ❌ 错误：找不到 dist\index.html
    echo 请确保 out 或 dist 文件夹存在！
    pause
    exit /b 1
)

echo ✅ 找到 dist 文件夹
echo.
echo 请复制以下命令到腾讯云控制台的"自定义部署"中执行：
echo.
echo ----------------------------------------------------------------------
echo tcb hosting deploy . / -e canchange-6g7ykdkaab655291
echo ----------------------------------------------------------------------
echo.
echo 或者使用这个命令（如果上面不行）：
echo ----------------------------------------------------------------------
echo cd /root/cloudbase-workspace ^&^& tcb hosting deploy . / -e canchange-6g7ykdkaab655291
echo ----------------------------------------------------------------------
echo.
echo 操作步骤：
echo 1. 复制上面的命令（选第一个）
echo 2. 回到腾讯云控制台
echo 3. 找到"自定义部署"或"CLI 部署"
echo 4. 粘贴命令执行
echo.
pause
