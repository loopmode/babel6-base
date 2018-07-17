# babel6-base

Common dependencies and build tools for babel6-based packages

## Usage

Install this package as a devDependency for a babel 6 setup.

It contains `babel`, `esdoc`, `eslint` and `prettier`, as well as some plugins/extensions.

Babel is configured with `babel-preset-env`, `babel-preset-react` an `babel-preset-stage-1` in the `.babelrc` file.
Decorator syntax is provided as well.
There are also eslint and prettier configs.

Typical setup for your `package.json`:

```javascript
{
  "name": "my-package",
  "version": "0.0.1",
  "scripts": {
    "build": "babel src --out-dir lib --copy-files",
    "lint": "eslint src",
    "docs": "esdoc"
  },
  "devDependencies": {
    "@loopmode/babel6-base": "*"
  },
  "babel": {
    "extends": "@loopmode/babel6-base/.babelrc"
  },
  "eslintConfig": {
    "extends": "@loopmode/react"
  }
}

Typical setup for your `prettier.config.js`:

```javascript
module.exports = require('@loopmode/babel6-base/prettier.config');
```