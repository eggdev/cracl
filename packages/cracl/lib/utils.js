const fs = require('fs');

const confirmOrWriteDirectory = async (folderPath) => {
  fs.mkdirSync(folderPath, {recursive: true});
  return;
};

module.exports = {
  confirmOrWriteDirectory,
};
