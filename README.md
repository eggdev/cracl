# Cracl

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

### React App CLI tool

React applications have a lot of variability in terms of folder structure and this will bring us all some sense of uniformity. This is designed to work alongside Create React App and the architecture they have in place.

This should work well with additional tools like Next.js and Gatsby.js as the intended purpose is to keep the file structure uniform across application generators.

To install

`npm install -g @eggdev/cracl`

To use

`cracl components Button`

## Commands

There are a few available directories that will be built by this tool

```
components
hooks
routes/pages
```

Tests are automatically built within the created component directories and will default to a basic render test. This is to encourage Test Driven Development by adding files to your application that will ensure safe builds.
