const fs = require('fs');

const defaultConfig = {
  monorepo: {
    packages: 'packages',
    app: 'main',
  },
  withTest: false,
  withIndex: false,
};

const generateDefaultConfig = async () => {
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

const generateConfig = async (userArgs) => {
  const mixedConfig = await generateDefaultConfig();
  // Ignore use of App if its not a mono repo
  const argsKeys = Object.keys(userArgs);
  const finalConfig = {
    ...mixedConfig,
    newFiles: [],
  };
  argsKeys.map((k) => {
    if (k === '_order' || k === '_args') return;
    if (k === 'app') return (finalConfig.defaultApp = userArgs[k]);
    finalConfig.newFiles.push({
      type: k,
      name: userArgs[k],
    });
  });

  return finalConfig;
};

module.exports = {
  generateConfig,
};
