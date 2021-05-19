const {readdirSync} = require('fs');
const {parseOptions} = require('./options');
const {generateConfig} = require('./defaultConfig');
const {generateFiles} = require('./fileGeneration');

exports.cracl = async () => {
  const args = process.argv;
  const userArgs = await parseOptions(args);
  const config = await generateConfig();
  // Create a third config that updates with users arguments

  const getDirectories = (source) =>
    readdirSync(source, {withFileTypes: true})
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

  const dirs = getDirectories(`${process.cwd()}`);
  const isMonoRepo = dirs.includes(config.monorepo.packagesFolder);

  const appDir = isMonoRepo
    ? `${config.monorepo.packagesFolder}/${config.appName}/src`
    : 'src';

  const generatorRequests = userArgs['_order'];
  // You want to allow a user to run 3 things at once if they want to generate a bunch of files
  const fileWritePath = `${process.cwd()}/${appDir}/`;

  generatorRequests.map((generator) =>
    generateFiles(fileWritePath, generator['key'], generator['value']),
  );
};
