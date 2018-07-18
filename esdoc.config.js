module.exports = {
    title: 'my-package',
    source: './src',
    destination: './docs',
    test: {
        type: 'mocha',
        source: './test',
        includes: ['(spec|Spec|test|Test)\\.js$']
    },
    coverage: true,
    includes: ['\\.js$'],
    excludes: [],
    unexportIdentifier: false,
    undocumentIdentifier: false,
    manual: {},
    experimentalProposal: {
        classProperties: true,
        objectRestSpread: true,
        decorators: true,
        doExpressions: true,
        functionBind: true,
        asyncGenerators: true,
        exportExtensions: true,
        dynamicImport: true
    },
    lint: false
};
