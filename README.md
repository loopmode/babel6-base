# babel6-base

Common dependencies and default configurations for babel6-based packages.  
Contains `babel`, `esdoc`, `eslint` and `prettier`, as well as some plugins/extensions in slightly outdated but stable versions.

## Installation

Install as a devDependency.

```bash
  yarn add --dev @loopmode/babel6-base
```

### Configuration

There are default config files that you can use as a base and extend/modify as needed.  


#### via config files

Typically you'll create a bunch of config files and extend the provided defaults there.  

```json
// .babelrc
{
  "extends": "@loopmode/babel6-base/.babelrc"
}
```

```json
// .eslintrc
{
  "extends": "@loopmode/babel6-base/.babelrc"
}

```

```javascript
// prettier.config.js
module.exports = {
  ...require('@loopmode/babel6-base/prettier.config')
};

```

```javascript
// .esdoc.js
module.exports = {
  ...require('@loopmode/babel6-base/esdoc.config')
}
```
 

#### via package.json

Alternatively, you can add keys to your `package.json`, but there are some caveats.


```json
// package.json
{
  "babel": {
    "extends": "@loopmode/babel6-base/.babelrc"
  },
  "eslintConfig": {
    "extends": "@loopmode/react"
  },
  "prettier": {
    ...
  },
  "esdoc": {
    ...
  }
```

#### Caveats:

- The eslint config [@loopmode/eslint-config-react](https://github.com/loopmode/eslint-config-react) is included as a dependency 
- When extending the eslint config, omit the `eslint-config-` part of the package name and use just `@loopmode/react` instead
- When configuring eslint via package.json, the key must be `"eslintConfig"` (and not just `"eslint"`)
- When configuring prettier or ESDoc via package.json, you can not extend from the default config - you have to provide a full configuration directly

### config options

- [eslint configuration](https://prettier.io/docs/en/configuration.html)
- [esdoc configuration](https://github.com/esdoc/esdoc/blob/v0.5.2/site/manual/configuration/config.md#full-config)
- [prettier configuration](https://prettier.io/docs/en/configuration.html)

## Usage

Just add some scripts to your `package.json` as usual:

```json
{
  "scripts": {
    "babel": "babel src --out-dir lib --copy-files",
    "eslint": "eslint src",
    "esdoc": "esdoc"
  }
}

```

Pass any arguments to the scripts as usual, e.g. `yarn babel --watch`.  

Note that ESLint and prettier enforce specific code style, and you might get a bunch of warnings for existing projects.  
Use `yarn eslint --fix` to normalize code style and whitespace.

Generate docs with `yarn esdoc`.

