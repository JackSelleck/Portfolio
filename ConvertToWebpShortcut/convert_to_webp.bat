@echo off
REM ==============================================
REM Convert all PNG and JPG images in this folder to WebP
REM Requires cwebp.exe in the same folder
REM ==============================================

setlocal enabledelayedexpansion

REM --- Conversion quality (0–100) ---
set QUALITY=90

echo ----------------------------------------------
echo Converting images to WebP (quality: %QUALITY%)
echo ----------------------------------------------

for %%f in (*.png *.jpg *.jpeg) do (
    echo Converting: %%f ...
    cwebp "%%f" -q %QUALITY% -o "%%~nf.webp" >nul 2>&1
)

echo ----------------------------------------------
echo Conversion complete!
echo ----------------------------------------------

pause
