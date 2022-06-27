const { exec } = require("child_process");
const _FILES = [
  "GH010023.MP4",
  "GH010024.MP4",
  "GH010025.MP4",
  "GH010027.MP4",
  "GH010028.MP4",
  "GH010031.MP4",
];

// _FILES.forEach(async (file, index) => {
//   console.log(`🚀 (${index + 1} of ${_FILES.length})file: ${file}`);
//   await exec(
//     `ffmpeg -i ./data/${file} -c copy -bsf:v h264_mp4toannexb -f mpegts ./out/${file}.ts`
//   );
// });

console.log(
  `ffmpeg -i "concat:${_FILES
    .map((f) => "./out/" + f + ".ts")
    .join("|")}" -c copy -bsf:a aac_adtstoasc ./data/GH0100.mp4`
);
// const concat = async () => {
//   await exec(
//     `ffmpeg -i "concat:${_FILES.join(
//       "|"
//     )}" -c copy -bsf:a aac_adtstoasc output.mp4`
//   );
// };

// concat();
