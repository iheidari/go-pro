const util = require("util");
const { execSync } = require("child_process");
const exec = util.promisify(require("child_process").exec);

// const _FILES = [
//   "GH010351",
//   "GH010352",
//   "GH010353",
//   "GH010354",
//   "GH010355",
//   "GH010356",
//   "GH010357",
// ];

const _INPUT_FOLDER = "./files/";
const _OUTPUT_FOLDER = "./out/";
const _FINAL_RESULT = _OUTPUT_FOLDER + "final.mp4";

const CONSOLE_RESET = "\x1b[0m";
const CONSOLE_YELLOW = "\x1b[33m";

const concat = async (inputFiles, outputFile) => {
  console.time("whole process");
  console.time("convert");
  console.log(
    "converting started. It is a paralel process for all files and can take up to few minutes."
  );
  const convertPromeses = inputFiles.map((file, index) =>
    exec(
      `ffmpeg -i ${
        _INPUT_FOLDER + file
      } -c copy -bsf:v h264_mp4toannexb -f mpegts file_${index}.ts`
    )
  );

  await Promise.all(convertPromeses);

  console.log(CONSOLE_YELLOW, "");
  console.timeEnd("convert");
  console.log(CONSOLE_RESET, "");

  console.time("concat");
  const filesList = inputFiles
    .map((file) => _OUTPUT_FOLDER + file + ".ts")
    .join("|");
  const command = `ffmpeg -i "concat:${filesList}" -c copy -bsf:a aac_adtstoasc ${_FINAL_RESULT}`;
  console.log(
    "🚀 ~ file: video-concat.js ~ line 34 ~ concat ~ command",
    command
  );
  execSync(command);
  console.log(CONSOLE_YELLOW, "");
  console.timeEnd("concat");
  console.timeEnd("whole process");
  console.log(CONSOLE_RESET, "");
};

export default concat;
