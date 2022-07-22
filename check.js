const fs = require("fs");

const { getAllFiles } = require("./util/file");
const { getAll } = require("./util/dataHelper");

const allFiles = getAllFiles("F:\\gopro");
// const allFiles = getAllFiles(__dirname + "\\files");
console.log("🚀 all files: ", allFiles.length);

const allData = getAll();
console.log("🚀 all uploaded: ", allData.length);

const result = allFiles.reduce((acc, file) => {
  if (file.extension === ".MP4") {
    const data = allData.find(
      (data) => data.name === file.name && data.size === file.size
    );
    const tmpFile = file.path + "\\" + file.name + ".tmpx";
    if (data) {
      if (fs.existsSync(tmpFile)) {
        fs.unlink(tmpFile, (err) => {
          if (err) throw err;
          console.log(tmpFile + "was deleted");
        });
      }
    } else {
      acc.push(file);
      fs.writeFileSync(tmpFile, "");
    }
  }
  return acc;
}, []);

console.log("🚀 not uploaded: ", result.length);
console.log("🚀 uploaded: ", allFiles.length - result.length);
fs.writeFileSync("./data/result.json", JSON.stringify(result), "utf8");

const grouped = result.reduce((acc, file) => {
  if (acc[file.path]) {
    acc[file.path]++;
  } else {
    acc[file.path] = 1;
  }
  return acc;
}, {});
fs.writeFileSync("./data/grouped.json", JSON.stringify(grouped), "utf8");
