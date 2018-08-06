#!/usr/bin/env node
const program = require('commander');
const { prompt } = require('inquirer');
const fs = require('fs-extra');
const path = require('path');

const availableFiles = ['.babelrc', '.editorconfig', '.eslintrc.js', '.esdoc.config.js', 'prettier.config.js'];

const availableScripts = {
    build: 'babel src --out-dir lib --copy-files',
    lint: 'eslint src',
    docs: 'esdoc'
};

const questions = [
    {
        message: 'What files would you like to create?',
        type: 'checkbox',
        name: 'files',
        choices: availableFiles.map(file => ({ name: file, checked: true }))
    },
    {
        message: 'What scripts would you like to add to package.json?',
        type: 'checkbox',
        name: 'scripts',
        choices: Object.keys(availableScripts).map(script => ({ name: script, checked: true }))
    }
];

program
    .command('install [dir]')
    .alias('i')
    .description('Add boilerplate files and scripts to your project')
    // .option('-r, --recursive', 'Remove recursively')
    .action(function(dir = process.cwd() /*, cmd*/) {
        prompt(questions).then(options => install(dir, options));
    });

async function install(dir, { files, scripts }) {
    console.log(dir, files, scripts);

    // copy files
    if (files && files.length) {
        for (let file of files) {
            const source = path.resolve(__dirname, file);
            const target = path.resolve(dir, file);
            try {
                await fs.copy(source, target);
            } catch (error) {
                console.error(`Failed copying file ${source} to ${target}`);
            }
        }
    }
    if (scripts && scripts.length) {
        try {
            const pkg = require(path.resolve(dir, 'package.json'));
            pkg.scripts = pkg.scripts || {};
            Object.entries(scripts).forEach(([key, value]) => {
                pkg.scripts[key] = value;
            });
            await fs.writeJson(path.resolve(dir, 'package.json'), pkg, { spaces: 2 });
        } catch (error) {
            console.error('Failed installing scripts', error);
        }
    }
}

program.parse(process.argv);
