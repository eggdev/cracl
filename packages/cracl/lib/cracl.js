const {parseOptions} = require('./options');
const {generateConfig} = require('./defaultConfig');

exports.cracl = async () => {
  const args = process.argv;
  const userArgs = await parseOptions(args);
  const config = await generateConfig();
};
