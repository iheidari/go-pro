const fs = require("fs");
const path = require("path");

const getFileInfo = (file) => {
  const extension = path.extname(file);
  const basename = path.basename(file);
  const filePath = path.dirname(file);

  const { birthtimeMs, size } = fs.statSync(file);
  return {
    file,
    path: filePath,
    extension,
    name: basename,
    birthtime: new Date(birthtimeMs),
    size,
  };
};

const getAllFiles = (dirPath, arrayOfFiles) => {
  const filesAndDirectories = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  filesAndDirectories.forEach((fnd) => {
    if (fs.statSync(dirPath + "/" + fnd).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + fnd, arrayOfFiles);
    } else {
      const file = path.join(dirPath, "/", fnd);
      arrayOfFiles.push(getFileInfo(file));
    }
  });

  return arrayOfFiles;
};

module.exports = { getAllFiles };
