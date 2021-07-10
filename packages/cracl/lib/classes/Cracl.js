const fs = require('fs');
const {confirmOrWriteDirectory, parseFileName} = require('../utils');
const Handlebars = require('handlebars');
const templates = require('../templates');

class Cracl {
  constructor() {
    this.withTest = false;
    this.withIndex = false;
    this.withStorybook = false;
    this.config = {
      newFiles: [],
    };
  }

  async generateAppConfig() {
    const configFilePath = `${process.cwd()}/.craclconfig.json`;
    try {
      // Try and open a custom config file
      const configString = await fs.readFileSync(
        configFilePath,
        'utf8',
        (file) => file,
      );
      const customConfig = JSON.parse(configString);
      // Double overwrite any of the default config with custom config
      return (this.config = {
        ...this.config,
        ...customConfig,
      });
    } catch (err) {
      // Just let the app be the config
    }
  }

  async applyUserArgs(userArgs) {
    // Map through the passed arguments and apply them to config values
    const argsKeys = Object.keys(userArgs);
    argsKeys.map((k) => {
      if (k === '_order' || k === '_args') return null;
      if (k === 'app') return (this.config.defaultApp = userArgs[k]);
      if (k === 'index') return (this.withIndex = true);
      if (k === 'storybook') return (this.withStorybook = true);
      if (k === 'test') return (this.withTest = true);
      this.config.newFiles.push({
        type: k,
        name: userArgs[k],
      });
      return null;
    });
  }

  async generateIndex(folderPath, filename, type) {
    let templateString = templates.index;
    if (type === 'context') {
      templateString = templates.context_index;
    }

    const template = Handlebars.compile(templateString);
    const js = template({filename});
    await fs.writeFileSync(`${folderPath}/${filename}/index.js`, js);
  }

  async generateStorybook(folderPath, filename) {
    const templateString = templates.storybook;
    const template = Handlebars.compile(templateString);
    const js = template({filename});
    await fs.writeFileSync(
      `${folderPath}/${filename}/${filename}.stories.js`,
      js,
    );
  }

  async generateFiles() {
    this.config.newFiles.map(async ({type, name}) => {
      const templateString = templates[type];
      const template = Handlebars.compile(templateString);
      const filename = parseFileName(type, name);
      const folderPath = `${this.writePath}/${type}`;
      const js = template({filename});
      await this.writeToPath(folderPath, filename, js);

      if (this.withIndex) {
        await this.generateIndex(folderPath, filename, type);
      }
      if (this.withStorybook) {
        await this.generateStorybook(folderPath, filename);
      }
    });
  }

  async writeToPath(folderPath, filename, js) {
    // Prompt to continue if file already exists
    await confirmOrWriteDirectory(`${folderPath}/${filename}`);
    await fs.writeFileSync(`${folderPath}/${filename}/${filename}.js`, js);
  }
}

module.exports = {Cracl};
