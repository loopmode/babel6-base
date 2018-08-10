const path = require('path');
const fs = require('fs-extra');
const replace = require('replace-in-file');

const supportedFiles = {
    babel: '.babelrc',
    editorconfig: '.editorconfig',
    eslint: '.eslintrc.js',
    esdoc: '.esdoc.js',
    prettier: 'prettier.config.js',
    sublime: 'project.sublime-project'
};

const supportedScripts = {
    build: 'babel src --out-dir lib --copy-files',
    lint: 'eslint src',
    docs: 'esdoc'
};

const DependencyMode = {
    NONE: 'no',
    INDIRECT: 'yes - using only this package as a dependency',
    DIRECT: 'yes - using all required packages as separate dependencies'
};

const questions = [
    {
        message: 'What files would you like to create?',
        type: 'checkbox',
        name: 'files',
        choices: Object.values(supportedFiles).map(file => ({ name: file, checked: true }))
    },
    {
        message: 'What scripts would you like to add to package.json?',
        type: 'checkbox',
        name: 'scripts',
        choices: Object.keys(supportedScripts).map(script => ({ name: script, checked: true }))
    },
    {
        message: 'Would you like to install the dependencies?',
        type: 'list',
        name: 'dependencies',
        default: DependencyMode.INDIRECT,
        choices: [DependencyMode.NONE, DependencyMode.DIRECT, DependencyMode.INDIRECT]
    }
];

async function install(dir, { files, scripts, dependencies }) {
    if (files && files.length) {
        await installFiles(dir, files);
    }

    if (scripts && scripts.length) {
        await installScripts(dir, scripts);
    }

    if (dependencies !== DependencyMode.NONE) {
        await installDependencies(dir, dependencies);
    }
}

async function installFiles(dir, files) {
    for (let file of files) {
        // ---------------------------------------
        // copy file
        // ---------------------------------------
        const source = path.resolve(__dirname, '../files/', file);
        const target = path.resolve(dir, file);
        try {
            await fs.copy(source, target);
        } catch (error) {
            console.error(`Failed copying file ${source} to ${target}`);
        }

        // ---------------------------------------
        // post-process file
        // ---------------------------------------
        try {
            switch (file) {
                case supportedFiles.esdoc:
                    await replace({
                        files: target,
                        from: /package-name/g,
                        to: getPackage(dir).name
                    });
            }
        } catch (error) {
            console.error(`Failed post-processing file ${target}`);
        }
    }
}

async function installScripts(dir, scripts) {
    const pkg = getPackage(dir);
    try {
        pkg.scripts = pkg.scripts || {};
        scripts.forEach(name => {
            pkg.scripts[name] = supportedScripts[name];
        });
        await fs.writeJson(path.resolve(dir, 'package.json'), pkg, { spaces: 2 });
    } catch (error) {
        console.error('Failed installing scripts', error);
    }
}

async function installDependencies(dir, mode) {
    try {
        const ownPackage = getPackage(path.resolve(__dirname, '..'));
        const targetPackage = getPackage(dir);

        const missingDeps = getMissingDependencies(ownPackage, targetPackage, mode);
        console.log('missingDeps', missingDeps);
        if (missingDeps.length > 0) {
            targetPackage.devDependencies = targetPackage.devDependencies || {};
            missingDeps.forEach(({ name, version }) => (targetPackage.devDependencies[name] = version));
            await fs.writeJson(path.resolve(dir, 'package.json'), targetPackage, { spaces: 2 });

            if (missingDeps.length === 1) {
                console.log(`Added 1 package to devDependencies`);
            } else {
                console.log(`Added ${missingDeps.length} packages to devDependencies`);
            }
            console.log('Please install the dependencies by executing "npm install" or "yarn install"');
        } else {
            console.log('No missing dependencies found');
        }
    } catch (error) {
        console.error('Failed adding dependencies', error);
    }
}

function getMissingDependencies(ownPackage, targetPackage, mode) {
    console.log('getMissingDependencies', mode);
    const ownDeps = Object.keys(ownPackage.dependencies || {}).filter(dep => {
        switch (dep) {
            case 'commander':
            case 'fs-extra':
            case 'inquirer':
            case 'replace-in-file':
                return false;
            default:
                return true;
        }
    });

    const targetDeps = []
        .concat(Object.keys(targetPackage.dependencies || {}))
        .concat(Object.keys(targetPackage.devDependencies || {}))
        .concat(Object.keys(targetPackage.peerDependencies || {}));

    switch (mode) {
        case DependencyMode.DIRECT:
            // install each dependency of this package as a dependency of the target package
            console.log('>>', ownDeps);
            return ownDeps.filter(name => targetDeps.indexOf(name) === -1).map(name => ({
                name: name,
                version: ownPackage.dependencies[name]
            }));
        case DependencyMode.INDIRECT:
            // install only this package as a dependency
            return [
                {
                    name: ownPackage.name,
                    version: `^${ownPackage.version}`
                }
            ];
        default:
            throw new Error(`Invalid mode ${mode}`);
    }
}
function getPackage(dir) {
    return require(path.resolve(dir, 'package.json'));
}

module.exports = install;
module.exports.questions = questions;
module.exports.supportedFiles = supportedFiles;
module.exports.supportedScripts = supportedScripts;
