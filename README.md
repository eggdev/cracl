# Cracl

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

### React App File Generator

To install

`npm install --save-dev @eggdev/cracl`

or

`yarn add @eggdev/cracl --dev`

#### To Use

`cracl -c NewComponent`

When using a Create React App folder, cracl will use its default config to follow conventional paths to components (or hooks or pages) to generate the new file in that location.

_With Lerna_

`cracl -a mainApp -c NewComponent`

This will default into the `packages` directory and find the React Application within it to add a file

#### Custom Config

`.craclconfig.json`

```json
{
  "monorepo": {
    "packagesFolder": "packages", // Default Lerna Packages Folder
    "defaultApp": "main" // -a argument will over write this if you have one more common app you build to
  },
  "withIndex": true // Will generate an index.js file that imports and exports the PascalCase component
}
```
