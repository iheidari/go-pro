get GPS data
ffmpeg -i GH010351.mp4 -map 0:3 OUTPUT-telemetry-only.MP4

cut video
ffmpeg -ss 00:01:00 -to 00:02:00 -i input.mp4 -c copy output.mp4

video to image
ffmpeg -i input.mp4 -vf fps=1 out%d.png

concat video
ffmpeg -i ./data/${file} -c copy -bsf:v h264_mp4toannexb -f mpegts ./out/${file}.ts
ffmpeg -i "concat:${\_FILES.join("|")}" -c copy -bsf:a aac_adtstoasc output.mp4

add watermark
ffmpeg -i output.mp4 -i iman.png -filter_complex "overlay=10:10" watermarket.mp4
https://gist.github.com/bennylope/d5d6029fb63648582fed2367ae23cfd6

rotate
ffmpeg -i in.mov -vf "transpose=1" out.mov
0 = 90CounterCLockwise and Vertical Flip (default)
1 = 90Clockwise
2 = 90CounterClockwise
3 = 90Clockwise and Vertical Flip
-vf "transpose=2,transpose=2" for 180 degrees

google path
https://www.google.com/maps/dir/49.7709564,-123.1395772/49.7755019,-123.1396777/@49.763975,-123.1049883,13.77z
