const fs = require("fs");

const RESULT = "./data/result.json";

const rawdata = fs.readFileSync(RESULT);
const files = JSON.parse(rawdata);

files.forEach((file) => {
  const tempFile = file.path + "\\" + file.name + ".tmpx";
  if (fs.existsSync(tempFile)) {
    fs.unlink(tempFile, (err) => {
      if (err) throw err;
      console.log(tempFile + " was deleted");
    });
  } else {
    console.log(tempFile + " not exists");
  }
});
