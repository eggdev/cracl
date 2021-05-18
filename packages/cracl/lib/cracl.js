const {checkForArgFolder, createFiles} = require('./validators');

exports.cracl = async () => {
  const args = process.argv.slice(2);
  switch (args[0]) {
    case '--help':
      return console.log(
        `
        Usage: cracl <command> <fileName>

        Commands:
          - components
          - hooks
          - pages
          - routes
      `
      );
    case 'components':
    case 'hooks':
    case 'routes':
    case 'pages':
      checkForArgFolder(args[0], args[1]);
      return createFiles(args[0], args[1]);
    default:
      return console.log(
        `
        Usage: cracl <command> <fileName>

        Commands:
          - components
          - hooks
          - pages
          - routes
      `
      );
  }
};
