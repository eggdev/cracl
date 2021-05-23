const {readdirSync} = require('fs');
const {parseOptions} = require('./options');
const {generateConfig} = require('./configGenerator');
const {generateFiles} = require('./fileGenerator');

exports.cracl = async () => {
  const args = process.argv;
  const userArgs = await parseOptions(args);
  const config = await generateConfig(userArgs);

  const getDirectories = (source) =>
    readdirSync(source, {withFileTypes: true})
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

  const dirs = getDirectories(`${process.cwd()}`);

  const isMonoRepo = Boolean(config.monorepo) && dirs.includes(config.monorepo);
  const appDir = isMonoRepo
    ? `${config.monorepo.packagesFolder}/${config.defaultApp}/src`
    : 'src';

  // You want to allow a user to run 3 things at once if they want to generate a bunch of files
  const fileWritePath = `${process.cwd()}/${appDir}`;

  config.newFiles.map((newFile) =>
    generateFiles(fileWritePath, newFile.type, newFile.name),
  );
};
