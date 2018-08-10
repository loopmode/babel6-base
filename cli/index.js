#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');

const install = require('./install');

program
    .command('install [dir]')
    .alias('i')
    .description('Add boilerplate files and scripts to your project')
    .action(function(dir = process.cwd()) {
        prompt(install.questions).then(options => install(dir, options));
    });

program.parse(process.argv);
