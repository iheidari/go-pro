get GPS data
ffmpeg -i GH010351.mp4 -map 0:3 OUTPUT-telemetry-only.MP4

cut video
ffmpeg -ss 00:01:00 -to 00:02:00 -i input.mp4 -c copy output.mp4

video to image
ffmpeg -i input.mp4 -vf fps=1 out%d.png

concat video
ffmpeg -i ./data/${file} -c copy -bsf:v h264_mp4toannexb -f mpegts ./out/${file}.ts
ffmpeg -i "concat:${\_FILES.join("|")}" -c copy -bsf:a aac_adtstoasc output.mp4
