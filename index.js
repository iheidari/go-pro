// const concat = require("./util/video/concat");
// const cut = require("./util/video/cut");
const fileManager = require("./file-manager");

const _FILES = [
  "./files/GH010351.MP4",
  "./files/GH010352.MP4",
  //   "./files/GH010353.MP4",
  //   "./files/GH010354.MP4",
  //   "./files/GH010355.MP4",
  //   "./files/GH010356.MP4",
  //   "./files/GH010357.MP4",
];

// concat(_FILES);
// cut(_FILES[0], "00:01:00", "00:01:10", "./temp/result.MP4");
fileManager("./files");
