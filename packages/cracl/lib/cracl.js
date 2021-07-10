const {parseOptions} = require('./options');
const {Cracl} = require('./classes/Cracl');

exports.cracl = async () => {
  const args = process.argv;
  const userArgs = await parseOptions(args);

  const cracl = new Cracl();
  await cracl.generateAppConfig();
  await cracl.applyUserArgs(userArgs);
  cracl.isMonoRepo = Boolean(cracl.config.monorepo);
  const appDir = cracl.isMonoRepo
    ? `${cracl.config.monorepo}/${cracl.config.writeDir}/src`
    : 'src';

  cracl.writePath = `${process.cwd()}/${appDir}`;

  await cracl.generateFiles();
};
