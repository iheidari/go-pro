const fs = require("fs");

const getJsonData = (file) => {
  const rawdata = fs.readFileSync(file);
  const data = JSON.parse(rawdata);
  if (data.length) {
    return data.map((item) => ({
      birthtime: new Date(item.captured_at),
      name: item.filename,
      size: item.file_size,
      id: item.id,
    }));
  }
};

const getAll = () => {
  const result = getJsonData("./data/full.json");
  return result;
};

module.exports = { getJsonData, getAll };
