const fs = require("fs")
const path = require("path")

const getAllFiles = function(dirPath,arrayOfFiles) {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })

  return arrayOfFiles
}

const x  = getAllFiles('F:\\100GOPRO\\b1')
console.log("🚀 ~ file: index.js ~ line 22 ~ x", x)
// const FILE = "F:\\100gopro\\b2\\GH010564.MP4"
// const extension = path.extname(FILE);
// const basename = path.basename(FILE)
// const fileState = fs.statSync(FILE)
// console.log("🚀 basename: ", basename)
// console.log("🚀 extension: ", extension)
// console.log("🚀 fileState: ", fileState)