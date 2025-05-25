@echo off
echo Converting all videos to WebM...

for %%f in (*.mp4 *.mov *.avi *.mkv) do (
    ffmpeg -i "%%f" -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus "%%~nf.webm"
)

echo Done!
pause