@echo off
echo Converting all JPG, JPEG, and webp Webp to WebP...

for %%f in (*.jpg *.jpeg *.webp) do (
    cwebp -q 80 "%%f" -o "%%~nf.webp"
)

echo Done!
pause
