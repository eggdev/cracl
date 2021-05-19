const fs = require('fs');

const defaultConfig = {
  monorepo: {
    packages: 'packages',
    app: 'main',
  },
  withIndex: true,
};

const generateConfig = async () => {
  const configFilePath = `${process.cwd()}/.craclconfig.json`;
  let config = {
    ...defaultConfig,
  };

  try {
    // Try and open a custom config file
    const configString = await fs.readFileSync(
      configFilePath,
      'utf8',
      (file) => file,
    );
    const customConfig = JSON.parse(configString);
    // Double overwrite any of the default config with custom config
    config = {
      ...config,
      ...customConfig,
    };
  } catch (err) {
    // do nothing
  }
  return config;
};

module.exports = {
  generateConfig,
};
