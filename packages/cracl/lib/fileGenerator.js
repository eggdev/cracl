const {writeFileSync} = require('fs');
const Handlebars = require('handlebars');
const {pascalCase, camelCase} = require('change-case');

const parseFileName = (type, name) => {
  switch (type) {
    case 'components':
      // Parse to Pascal Case
      return pascalCase(name);
    case 'hooks':
      const hasUse = name.slice(0, 3) === 'use';
      if (hasUse) return camelCase(name);
      else return `use${pascalCase(name)}`;
    default:
      console.error('Type not availble for generation');
      process.exit(1);
  }
};

const writeToPath = async (filePath, js) => {
  // Prompt to continue if file already exists
  await writeFileSync(filePath, js);
};

const generateFiles = async (path, type, name) => {
  // Grab the file template that needs to be used
  const templateString = require(`./templates/${type}.js`);
  const template = Handlebars.compile(templateString);
  // Update the file name for consistency
  const filename = parseFileName(type, name);

  // Generate the file and path with proper variables
  const filePath = `${path}/${type}/${filename}/${filename}.js`;
  const js = template({filename});

  await writeToPath(filePath, js);
};

module.exports = {
  generateFiles,
};
