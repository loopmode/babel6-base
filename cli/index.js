#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const { prompt } = require('inquirer');

const install = require('./install');

program
    .command('install [dir]')
    .alias('i')
    .description('Add boilerplate files and scripts to your project')
    .action(function(dir = process.cwd()) {
        if (!fs.existsSync(path.resolve(dir, 'package.json'))) {
            console.warn(`
    ${path.resolve(dir)} doesn't seem to be a node.js project.

    Please initialize first using "npm init" or "yarn init".
    `);
            throw new Error('No package.json found');
            process.exit(1);
        }

        prompt(install.questions).then(options => install(dir, options));
    });

program.parse(process.argv);
