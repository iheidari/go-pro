const fs = require("fs");

const getJsonData = (file) => {
  const rawdata = fs.readFileSync(file);
  const data = JSON.parse(rawdata);
  media = data._embedded.media;
  if (media.length) {
    return media.map((item) => ({
      birthtime: new Date(item.captured_at),
      name: item.filename,
      size: item.file_size,
      id: item.id,
    }));
  }
};

const getAll = () => {
  const result = [];
  const _FILES = [
    "./data/1.json",
    "./data/2.json",
    "./data/3.json",
    "./data/4.json",
    "./data/5.json",
    "./data/6.json",
  ];
  _FILES.forEach((file) => {
    result.push(...getJsonData(file));
  });
  return result;
};

module.exports = { getJsonData, getAll };
