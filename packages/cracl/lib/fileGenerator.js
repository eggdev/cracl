const Handlebars = require('handlebars');

const parseFileName = (type, name) => {
  return name;
};

const generateFiles = (path, type, name) => {
  const finalPath = `${path}/${type}/${name}/${name}.js`;
  const templateString = require(`./templates/${type}.js`);
  const template = Handlebars.compile(templateString);
  const filename = parseFileName(type, name);

  // const context = {filename};
  // const js = template(context);
};

module.exports = {
  generateFiles,
};
