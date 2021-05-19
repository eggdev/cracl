const fs = require('fs');
const dashdash = require('dashdash');

const parseOptions = (args) => {
  const options = [
    {
      names: ['app', 'a'],
      type: 'string',
      help: 'Application directory to look for in a mono repo setting',
    },
    {
      names: ['help', 'h'],
      type: 'bool',
      help: 'Print this help and exit.',
    },
    {
      names: ['components', 'component', 'comp', 'c'],
      type: 'string',
      help: 'Use if generating a Component',
    },
    {
      names: ['hooks', 'hook', 'hk'],
      type: 'string',
      help: 'Use if generating a Hook',
    },
    {
      names: ['routes', 'route', 'r'],
      type: 'string',
      help: 'Use if generating a Route',
    },
    {
      names: ['test', 't'],
      type: 'bool',
      help: 'Use if a test should be generated',
    },
  ];

  let opts;
  const parser = dashdash.createParser({options: options});
  try {
    opts = parser.parse(args);
  } catch (e) {
    console.error('foo: error: %s', e.message);
    process.exit(1);
  }

  if (opts.help) {
    const help = parser.help({includeEnv: true}).trimRight();
    console.log('usage: node foo.js [OPTIONS]\n' + 'options:\n' + help);
    process.exit(0);
  }
  return opts;
};

const defaultConfig = {};

exports.cracl = async () => {
  const args = process.argv;
  const options = await parseOptions(args);
  const configFile = `${process.cwd()}/.craclconfig.json`;
  let config;
  try {
    const customConfig = await fs.readFileSync(
      configFile,
      'utf8',
      (file) => file,
    );
  } catch (err) {
    config = defaultConfig;
  }
  console.log(config);

  // console.log(options);
};
