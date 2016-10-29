# Angular 2 - Webpack Boilerplate

This project defines the basic project structure and build process needed to create an
[Angular 2](https://angular.io/) web app. 

It incorporates code and ideas from the following:
* [Angular 2 Docs](https://angular.io/docs/ts/latest/)
* [Tutorial: Tour of Heroes](https://angular.io/docs/ts/latest/tutorial/)

_This project was created in my attempt to better understand Angular 2 and intended for
educational purposes. If you are looking to get started building your own Angular 2 apps I would
recommend a well supported project such as [angular-cli](https://github.com/angular/angular-cli)._

## Features
* Development and production build processes using [Webpack](https://webpack.github.io/)
* Styling with [Sass](http://sass-lang.com/)
* [TypeScript 2](http://www.typescriptlang.org/)
* [@types](https://www.npmjs.com/%7Etypes) TypeScript definitions

---

## Setup

### Requirement
* [Node](https://nodejs.org/en/) >= 6.0
([Node Version Manager](https://github.com/creationix/nvm) is recommended)
* [npm](https://docs.npmjs.com/) >= 3.0 (typically bundled with node)

### Installation
```bash
npm install
```

---

## Tasks
There are a number of tasks which can be executed using the npm scripts defined under
`scripts` in `./package.json`

### Launch Development Server
```bash
npm start
```

The `start` script executes Webpack using the development configuration
(`./config/webpack.dev.js`) and launches a development server that hosts our
application at [http://localhost:8080](http://localhost:8080).

While the script is running, Webpack will monitor the project for changes
and automatically generate an updated bundle. These changes are automatically
pushed to our application running in the browser.

### Generate Production Build
```bash
npm run build
```

The `build` script executes Webpack using the production configuration
(`./config/webpack.dev.js`) and outputs the result to `./dist`.
The resulting package include all application code, dependencies and assets;
and is ready for deployment.

---

## Configure IDE

### JetBrains WebStorm
JetBrains PhpStorm/WebStorm provides broad support for web technologies and requires minor configuration for
TypeScript and Angular 2 integration.

#### Enable TypeScript Support
1. Navigate to "Settings" => "Languages & Frameworks" and ensure that "Node Interpreter"
is set to the correct version.
2. Update the "TypeScript version" to point to our local copy at `/path/to/project/node_modules/typescript/lib`.
3. Ensure that the TypeScript compiler is disabled. Compilation will happen as part of our
Webpack build process.

### Visual Studio Code
* Provides almost complete support out of the box
* Requires an additional plugin for Sass
* Requires that the `typescript.tsdk` property in `./.vscode/settings.json`
reference our local copy at `node_modules/typescript/lib`
(this configuration file is included in this project by default)

---

## Project Conventions

### File Structure Overview
```text
ng2-webpack-boilerplate
├─ config                           // contains code related to the build process and test runner
│   ├─ webpack.common.js            // common webpack configuration for the development and production configurations
│   ├─ webpack.dev.js               // webpack configuration for development; extends webpack.common.js
│   └─ webpack.prod.js              // webpack configuration for bundling our application for production
├─ src
│   ├─ app                          // application folder
│   │   └─ index.ts                 // main entry-point of our application
│   ├─ styles ...                   // defines styles for the entire app
│   ├─ global.d.ts                  // defines any missing TypeScript type definitions
│   ├─ index.ejs                    // template that defines the apps index.html
│   └─ main.ts                      // responsible for loading and bootstrapping our app
│
├─ .editorconfig                    // defines a base coding style to be applied to files throughout the project
│                                   // the format is automatically recognized by many IDEs
├─ package.json                     // npm module configuration; details project dependencies, metadata and scripts
├─ tsconfig.json                    // configures the TypeScript compiler
└─ webpack.config.js                // defines the default Webpack configuration
```
---

## Understanding Webpack
_(my current understanding of Webpack)_

[Webpack](https://webpack.github.io/) is a build tool for generating JavaScript
module bundles. A module bundle is a JavaScript file that contains all dependencies
of some root module. Dependencies are resolved in a recursively process that follows
the Node.js module resolution rules.

By default, webpack supports both the CommonJS (i.e., export and require()), and AMD
modules. This project uses CommonJS.

### Configuring Webpack
In order for Webpack to function we must provide some configuration. The default
location is `./webpack.config.js` in the root of the project.

This project includes several annotated Webpack configuration files including
`./config/webpack.dev.js` for development and `./config/webpack.prod.js` to produce a
production ready build. Both of these configuration inherit from `./config/webpack.common.js`.

### Defining Entry Points
Every Webpack configuration begins with an `entry` object defining the entry
point modules. Entry points define the root of a module bundle, and it is up to Webpack
to recursively discover all dependencies, and include them in the bundle.

For example we define the following in `./config/webpack.common.js`:
```javascript
{
  entry: {
    // defines our entry chunks
    'main': './src/main.ts'
  }
}
```

A Webpack configuration must also include an `output` object detailing used to
define how each corresponding bundle is outputted.

For example, here is an excerpt from `./config/webpack.dev.js`:

```javascript
{
  // defines how the bundles are outputted
  // when used in conjunction of the devServer a dist folder
  // will not be generated but will remain in memory
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    // bundles with cache busting hash
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  }
}
```

### Bundling Everything
Webpack has the ability to bundle non-JavaScript dependencies including CSS and static
resources such as images and fonts. This is done through the use of specialized
[loaders](http://webpack.github.io/docs/loaders.html) which act as pre-processors that
transform a given resource into something that can be included in a bundle.

Here are some of the loaders used in the project:
* The [style-loader](https://github.com/webpack/style-loader) allows CSS to be included
in a bundle (using a require() statement). CSS that is bundled in this way is injected
into the DOM by the Webpack runtime.
* The [awsome-typescript-loader](https://github.com/s-panferov/awesome-typescript-loader) can be used to
transpile TypeScript into JavaScript so that it can be included in the bundle.

### Asynchronous Module Loading
The Webpack _code splitting_ feature allows us to load modules asynchronously. _Code splitting_ is the
process of breaking our bundles into chunks that can then be loaded on demand.
A chunk is a file that contain some subset of our codebase.

We can define a chunk to be loaded on demand using the `require.ensure` CommonJS method.
For example, in our `main` entry point module (`./src/main.ts`) we define a new on-demand
chunk corresponding to our `app` module defined at `./src/app/index.ts`:

```javascript
// here we create a dynamic chunk corresponding to the main app
// note that any number of modules can be added to the chunk in this manner
require.ensure(['./app'], (require) => {
  // this callback only runs once all required dependencies are loaded
  require('./app').bootstrap();
});
```

A good explanation of _code splitting_ and the motivation behind it can be found at
[Advanced WebPack Part 2 - Code Splitting](http://jonathancreamer.com/advanced-webpack-part-2-code-splitting/).