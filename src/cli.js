#!/usr/bin/env node

'use strict';

const pkg = require(`../package.json`);
const program = require(`commander`);
const axionRelease = require(`./index.js`);

program
  .description(pkg.description)
  .version(pkg.version)
  .option(`-p, --preset <convention>`, `Preset package name [angular, @scope/angular, ...]. See 'conventional-recommended-bump' for preset package requirements.`)
  .parse(process.argv);
const packageOpts = {
  preset: program.preset,
};

axionRelease(packageOpts)
  .then(releasedVersion => {
    const message = releasedVersion ?
      `Released version ${releasedVersion}` :
      `No changes are available to release.`;
    console.log(message);
  })
  .catch(error => {
    console.error(`axion-release failed for the following reason - ${error}`);
    process.exit(1);
  });
