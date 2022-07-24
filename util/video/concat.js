const util = require("util");
const { execSync } = require("child_process");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");

const CONSOLE_RESET = "\x1b[0m";
const CONSOLE_YELLOW = "\x1b[33m";
const _TEMP_FOLDER = "./temp";

const concat = async (inputFiles, outputFolder = "./temp") => {
  console.time("whole process");
  console.time("convert");
  console.log(
    "converting started. It is a paralel process for all files and can take up to few minutes."
  );
  if (!fs.existsSync(_TEMP_FOLDER)) {
    fs.mkdirSync(_TEMP_FOLDER);
  }
  const convertPromeses = inputFiles.map((file, index) =>
    exec(
      `ffmpeg -i ${file} -c copy -bsf:v h264_mp4toannexb -f mpegts ${_TEMP_FOLDER}/file_${index}`
    )
  );

  await Promise.all(convertPromeses);

  console.log(CONSOLE_YELLOW, "");
  console.timeEnd("convert");
  console.log(CONSOLE_RESET, "");

  console.time("concat");
  const filesList = Array.from(Array(inputFiles.length).keys()).map(
    (i) => `${_TEMP_FOLDER}/file_${i}`
  );
  const outputFile = new Date().toISOString().substring(0, 19);
  const command = `ffmpeg -i "concat:${filesList.join(
    "|"
  )}" -c copy -bsf:a aac_adtstoasc ${outputFolder}/${outputFile}.MP4`;
  console.log("🚀 concat command:   ", command);
  execSync(command);

  //delete temporary files
  filesList.forEach((file) => {
    fs.unlinkSync(file);
  });

  console.log(CONSOLE_YELLOW, "");
  console.timeEnd("concat");
  console.timeEnd("whole process");
  console.log(CONSOLE_RESET, "");
};

module.exports = concat;
