get GPS data
ffmpeg -i GH010351.mp4 -map 0:3 OUTPUT-telemetry-only.MP4

cut video
ffmpeg -ss 00:01:00 -to 00:02:00 -i input.mp4 -c copy output.mp4

video to image
ffmpeg -i input.mp4 -vf fps=1 out%d.png
