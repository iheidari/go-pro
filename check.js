const fs = require("fs");

const { getAllFiles } = require("./util/file");
const { getAll } = require("./util/dataHelper");

// const allFiles = getAllFiles("H:\\100GOPRO");
const allFiles = getAllFiles(__dirname + "\\files");
console.log("🚀 all files: ", allFiles.length);

const allData = getAll();
console.log("🚀 all uploaded: ", allData.length);

const result = allFiles.reduce((acc, file) => {
  const data = allData.find(
    (data) => data.name === file.name && data.size === file.size
  );
  const tmpFile = file.path + "\\" + file.name + ".tmpx";
  if (data) {
    acc.push(file);
    fs.writeFileSync(tmpFile, "");
  } else {
    if (fs.existsSync(tmpFile)) {
      fs.unlink(tmpFile, (err) => {
        if (err) throw err;
        console.log(tmpFile + "was deleted");
      });
    }
  }
  return acc;
}, []);

console.log("🚀 uploaded: ", result.length);
console.log("🚀 not uploaded: ", allFiles.length - result.length);
fs.writeFileSync("./data/result.json", JSON.stringify(result), "utf8");
