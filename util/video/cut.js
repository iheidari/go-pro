const { execSync } = require("child_process");

const cut = (input, from, to, output) => {
  execSync(`ffmpeg -ss ${from} -to ${to} -i ${input} -c copy ${output}`);
};

module.exports = cut;
