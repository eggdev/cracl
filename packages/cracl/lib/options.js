const dashdash = require('dashdash');
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
    names: ['hooks', 'hook', 'k'],
    type: 'string',
    help: 'Use if generating a Hook',
  },
  // TODO: If it's Next.js you want to change it to be pages directory
  // {
  //   names: ['routes', 'route', 'r'],
  //   type: 'string',
  //   help: 'Use if generating a Route',
  // },
  // TODO: Need to confirm Testing tool so in package.json/config so you can generate the right type
  // {
  //   names: ['test', 't'],
  //   type: 'bool',
  //   help: 'Use if a test should be generated',
  // },
  // TODO: Need to make this option passed with the component so it can be generated at the proper path
  {
    names: ['index', 'i'],
    type: 'bool',
    help: 'Use if you want to generate an index.js file that exports the new component',
  },
  {
    names: ['storybook', 's'],
    type: 'bool',
    help: 'Use this flag to auto generate a storybook component',
  },
];

const parseOptions = (args) => {
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

module.exports = {options, parseOptions};
