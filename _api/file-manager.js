const { getAllFiles } = require("./util/file");

const fileManager = (folderPath) => {
  const files = getAllFiles(folderPath).sort(
    (a, b) => new Date(a.birthtime) - new Date(b.birthtime)
  );
  let group = 0;
  const grouped = files.reduce((acc, file) => {
    if (
      acc.length > 0 &&
      new Date(file.birthtime) - new Date(acc[acc.length - 1].birthtime) <
        10 * 60000
    ) {
      console.log(
        "1 ",
        new Date(file.birthtime) - new Date(acc[acc.length - 1].birthtime)
      );
      acc.push({ file: file.file, birthtime: file.birthtime, group });
    } else {
      group++;
      if (acc.length > 0) {
        console.log(
          "2 ",
          new Date(file.birthtime) - new Date(acc[acc.length - 1].birthtime)
        );
      }
      acc.push({ file: file.file, birthtime: file.birthtime, group });
    }

    return acc;
  }, []);
  console.log(JSON.stringify(grouped, null, 2));
};

module.exports = fileManager;
