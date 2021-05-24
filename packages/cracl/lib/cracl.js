const {parseOptions} = require('./options');
const {generateConfig} = require('./configGenerator');
const {generateFiles} = require('./fileGenerator');

exports.cracl = async () => {
  const args = process.argv;
  const userArgs = await parseOptions(args);
  const config = await generateConfig(userArgs);

  const isMonoRepo = Boolean(config.monorepo);
  const appDir = isMonoRepo
    ? `${config.monorepo}/${config.defaultApp}/src`
    : 'src';

  // You want to allow a user to run 3 things at once if they want to generate a bunch of files
  const fileWritePath = `${process.cwd()}/${appDir}`;

  config.newFiles.map((newFile) =>
    generateFiles(fileWritePath, newFile.type, newFile.name),
  );
};
