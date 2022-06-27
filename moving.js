const fs = require("fs");

const { getAll } = require("./util/dataHelper");
const { getAllFiles } = require("./util/file");

const GetDate = (dateTime) => {
  const d = new Date(dateTime);
  const date = d.getDate();
  const month = d.getMonth() + 1;
  return `${d.getFullYear()}-${month < 10 ? "0" + month : month}-${
    date < 10 ? "0" + date : date
  }`;
};

const allFiles = getAllFiles("F:\\gopro");
console.log("🚀 all files: ", allFiles.length);
console.log("🚀 all files: ", allFiles[0]);
const allData = getAll();
console.log("🚀 allData", allData.length);
console.log("🚀 allData", allData[0]);

let others = "";
allFiles.forEach((file) => {
  const data = allData.find(
    (d) => d.name === file.name && d.size === file.size
  );
  if (data) {
    const birthDate = GetDate(data.birthtime);
    const newPath = `F:\\Sorted\\${birthDate}\\`;

    if (!fs.existsSync(newPath)) {
      fs.mkdirSync(newPath, { recursive: true });
      console.log(`🚀 fs.mkdirSync(${newPath});`);
    }
    fs.renameSync(file.file, newPath + file.name);
    console.log(`🚀 fs.renameSync(${file.file},${newPath + file.name});`);
  } else {
    others += file.path + "\n";
  }
});

fs.writeFileSync("./data/others.txt", others);
