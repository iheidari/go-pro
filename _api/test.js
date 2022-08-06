const gpmfExtract = require("gpmf-extract");
const goproTelemetry = require(`gopro-telemetry`);
const fs = require("fs");

const file = fs.readFileSync("./OUTPUT-telemetry-only.mp4");

gpmfExtract(file)
  .then((extracted) => {
    goproTelemetry(extracted, {}, (telemetry) => {
      fs.writeFileSync(
        "output_path.json",
        JSON.stringify(telemetry["1"].streams.GPS5)
      );
      console.log("Telemetry saved as JSON");
    });
  })
  .catch((error) => console.error(error));


  https://www.google.com/maps/dir/49.7709564,-123.1395772/49.7755019,-123.1396777/@49.763975,-123.1049883,13.77z