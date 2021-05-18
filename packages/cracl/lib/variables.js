const fs = require("fs");

exports.checkForConfig = async (workingDir) => {
  const hasConfig = workingDir.includes("cracl.json");
  const configVals = {};
  await fs.readFile(`cracl.json`, "utf8", (err, raw) => {
    if (err) return console.log(err);
    const config = JSON.parse(raw);
  });
};
