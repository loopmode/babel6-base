# babel6-base

Common dependencies and build tools for babel6-based packages

## Usage

Install this package as a devDependency for a babel 6 setup.

It contains

- `babel` at version 6
- `esdoc`
- `eslint`
- `prettier`
- `rimraf`

Babel is configured with `babel-preset-env`, `babel-preset-react` an `babel-preset-stage-1` in the `.babelrc` file.

There are also `.eslintrc` and `.prettierrc` files that suit my needs.

Typical setup for your own `package.json`:

```javascript
{
  "name": "my-package",
  "version": "0.0.1",
  "scripts": {
    "clean": "rimraf lib/*",
    "build": "rimraf lib/* && babel src --out-dir lib --copy-files",
    "watch": "rimraf lib/* && babel src --out-dir lib --copy-files --watch",
    "lint": "eslint src",
    "lint:fix": "eslint src --fix"
  },
  "devDependencies": {
    "@loopmode/babel6-base": "*"
  },
  "babel": {
    "extends": "@loopmode/babel6-base/.babelrc"
  },
  "eslint": {
    "extends": "@loopmode/babel6-base/.eslintrc"
  },
  "prettier": {
    "extends": "@loopmode/babel6-base/.prettierrc"
  }
}

```

