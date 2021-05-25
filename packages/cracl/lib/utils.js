const fs = require('fs');
const {pascalCase, camelCase} = require('change-case');

const confirmOrWriteDirectory = async (folderPath) => {
  fs.mkdirSync(folderPath, {recursive: true});
};

const parseFileName = (type, name) => {
  const hasUse = name.slice(0, 3) === 'use';
  switch (type) {
    case 'components':
      // Parse to Pascal Case
      return pascalCase(name);
    case 'hooks':
      if (hasUse) return camelCase(name);
      else return `use${pascalCase(name)}`;
    default:
      console.error('Type not availble for generation');
      process.exit(1);
  }
};

module.exports = {
  confirmOrWriteDirectory,
  parseFileName,
};
