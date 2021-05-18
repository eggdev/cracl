const fs = require("fs");
const { file_builder } = require("./file_builder");

exports.checkForArgFolder = (dir, fileName) => {
  if (!fs.existsSync("./src/")) {
    fs.mkdirSync("./src/");
  }
  if (!fs.existsSync(`./src/${dir}`)) {
    fs.mkdirSync(`./src/${dir}`);
  }
  if (dir !== "hooks") fs.mkdirSync(`./src/${dir}/${fileName}`);
};

exports.createFiles = (dir, name) => {
  const isHook = dir === "hooks";
  let fileName;
  // Set up hooks with proper naming convention
  if (isHook && name.indexOf("use") < 0) {
    fileName = `use${name[0].toUpperCase() + name.slice(1)}`;
  } else if (isHook && name.indexOf("use") === 0) {
    fileName = `use${name[3].toUpperCase() + name.slice(4)}`;
  } else {
    fileName = name[0].toUpperCase() + name.slice(1);
  }

  const mainStream = fs.createWriteStream(
    `./src/${dir}/${isHook ? `${fileName}.js` : `${fileName}/${fileName}.js`}`
  );

  mainStream.once("open", (fd) => {
    const file = file_builder(dir, fileName);
    mainStream.end(file);
  });

  if (!isHook) {
    const testStream = fs.createWriteStream(
      `./src/${dir}/${fileName}/${fileName}.test.js`
    );
    testStream.once("open", (fd) => {
      const testFile = file_builder("tests", fileName);
      testStream.end(testFile);
    });
    const indexStream = fs.createWriteStream(
      `./src/${dir}/${fileName}/index.js`
    );
    indexStream.once("open", (fd) => {
      const file = file_builder("index", fileName);
      indexStream.end(file);
    });
  }

  console.log("Files built. Happy Hacking!");
};
