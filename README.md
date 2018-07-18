# babel6-base

Common dependencies and build tools for babel6-based packages.  
Contains `babel`, `esdoc`, `eslint` and `prettier`, as well as some plugins/extensions in slightly outdated but stable versions.

Babel is configured with `babel-preset-env`, `babel-preset-react` an `babel-preset-stage-1` in the `.babelrc` file.
Decorator syntax is provided as well.

## Usage

Install this package as a devDependency. Then add configs and scripts/commands to your project.
Here's a way to configure your `package.json`:

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

```

### Config files

There are a couple of default config files that you can use as a base.

#### babel

There is a `@loopmode/babel6-base/.babelrc` in this project.
You can use and extend it in various ways, the easiest being to just add it to your `package.json` as shown above.

```
  ...
  "babel": {
    "extends": "@loopmode/babel6-base/.babelrc"
  }
  ...
```


Alternatively, create a `.babelrc` file and use the `"extends"` property:

```
{
  "extends": "@loopmode/babel6-base/.babelrc",
  ...
}
```

#### eslint

Due to the way the eslint configuration works, including a base config in this project directly would have been problematic, while having a standalone project is really easy.

So the config is available separately via `@loopmode/eslint-config-react` and is included as a dependency.
You can use/extend it using any of the numerous ways provided by ESLint.

Easiest way is to add an entry to your `package.json` as shown above.

```
  ...
  "eslintConfig": {
    "extends": "@loopmode/react"
  }
  ...
```

#### prettier

Typical setup for your `prettier.config.js`:

```javascript
module.exports = require('@loopmode/babel6-base/prettier.config');
```

See [https://prettier.io/docs/en/configuration.html](https://prettier.io/docs/en/configuration.html) for all options.

#### esdoc

Typical setup for your `.esdoc.js` config:

```javascript
module.exports = require('@loopmode/babel6-base/esdoc.config')
```
See [https://github.com/esdoc/esdoc/blob/v0.5.2/site/manual/configuration/config.md](https://github.com/esdoc/esdoc/blob/v0.5.2/site/manual/configuration/config.md) for all options

#### customize configs

Easiest way to customize the provided configs:

```javascript
module.exports = {
  ...require('@loopmode/babel6-base/esdoc.config'),
  title: 'my package'
}
```
