const URL_Template = (page) =>
  `https://api.gopro.com/media/search?fields=captured_at,filename,file_size,id&processing_states=registered,rendering,pretranscoding,transcoding,failure,ready&order_by=captured_at&per_page=200&page=${page}`;

const fs = require("fs");

var axios = require("axios");

require("dotenv").config();

var config = (page) => ({
  method: "get",
  url: URL_Template(page),
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0",
    Accept: "application/vnd.gopro.jk.media+json; version=2.0.0",
    Authorization: "Bearer " + process.env.TOKEN,
  },
});

async function retrieve() {
  const { data } = await axios(config(1));

  console.log(
    `total_items: ${data._pages.total_items} - total_pages: ${data._pages.total_pages}`
  );
  const result = data._embedded.media;
  for (let i = 2; i <= +data._pages.total_pages; i++) {
    const { data } = await axios(config(i));
    result.push(...data._embedded.media);
  }
  fs.writeFileSync("./data/full.json", JSON.stringify(result), "utf8");
}

retrieve();
