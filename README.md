# Angular 2 - Webpack Boilerplate

This project defines the basic project structure and build process needed to create an
[Angular 2](https://angular.io/) web app. 

> This project was created in my attempt to better understand Angular 2 and is intended for
> educational purposes. If you are looking to get started building your own Angular 2 apps I would
> recommend a well supported project such as [angular-cli](https://github.com/angular/angular-cli).

## Features
* Sample Angular 2 app demonstrating basic implementation of Modules,
  Components and Services
* Complete development and production build processes using [Webpack](https://webpack.github.io/);
  based on [Webpack: An Introduction](https://angular.io/docs/ts/latest/guide/webpack.html)
* Support for unit testing with [Jasmine](http://jasmine.github.io/) (assertion library),
  [Karma](https://karma-runner.github.io/1.0/index.html) (test runner) and
  [Phantom.js](http://phantomjs.org/) (test environment)
* Sample unit tests for Angular 2 Components and Services
* Styling with [Sass](http://sass-lang.com/)
* [TypeScript 2](http://www.typescriptlang.org/)
* TypeScript linting (static code analysis) with [TSLint](https://github.com/palantir/tslint)
* The [Codelyzer](https://github.com/mgechev/codelyzer#codelyzer ) TSLint rule set to
  enforce the [Angular 2 Style Guide](https://angular.io/styleguide)
* TypeScript definitions from the [@types](https://www.npmjs.com/%7Etypes) project 
* Sample usage of [Material Design for Angular 2](https://github.com/angular/material2)
  themes and Components

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

### Run Unit Tests
```bash
npm run test
```

The `test` script launches the Karma test runner and executes all unit tests
matching `./src/app/**/*.spec.ts`.

### Run TypeScript Linter
```bash
npm run tslint
```

Runs TSLint against all TypeScript files in the `./src` folder and prints any violations
in the console.

#### TSLint configuration
The linter rules are configured in `./tslint.json`. It is currently using the
[recommended Codelyzer rules](https://github.com/mgechev/codelyzer#recommended-configuration) 
to enforce the official [Angular 2 Style Guide](https://angular.io/styleguide).

Most of the linter rules are generic and can be used in any project without modification
except for the following:
```javascript
  "rules": {
    "directive-selector-prefix": [true, "awb"],
    "component-selector-prefix": [true, "awb"],
    "pipe-naming": [true, "camelCase", "awb"]
  }
```
The string `"awb"` refers to the initials of this project. See
[Custom Prefix for Components](https://angular.io/docs/ts/latest/guide/style-guide.html#!#02-07)
for more information.

---

## IDE Configuration 

### Visual Studio Code
Configuration is handled by `./.vscode/settings.json`.

#### Enable TypeScript Support
Visual Studio Code provides TypeScript support out of the box. However, in order to
ensure it is using the TypeScript SDK belonging to the project you should
add the following to `./.vscode/settings.json`:
```javascript
{
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

#### Enable TypeScript Linter Support
TSLint support can be enabled by installing the
[TSLint plugin](https://marketplace.visualstudio.com/items?itemName=eg2.tslint).

### JetBrains WebStorm/PhpStorm

#### Enable TypeScript Support
1. Navigate to "Settings" => "Languages & Frameworks" and ensure that "Node Interpreter"
  is set to the correct version.
2. Update the "TypeScript version" to point to our local copy at `/path/to/project/node_modules/typescript/lib`.
3. Ensure that the TypeScript compiler is disabled. Compilation will happen as part of our
Webpack build process.

#### Enable TypeScript Linter Support
1. Navigate to "Settings" => "Languages & Frameworks" => "TypeScript" => "TSLint"
2. Ensure that "Node Interpreter" is set to the correct version.
3. Update "TSLint package" to reference our local copy at `/path/to/project/node_modules/tslint`.

---

## Project Conventions

### File Structure Overview
```text
ng2-webpack-boilerplate
├─ config                           // contains code related to the build process and test runner
│   ├─ karma-test-shim.js           // a Karma preprocessor that is run to configure the test environment and import 
│   │                               // all tests that need to be run  
│   ├─ karma.conf.js                // configuration for the Karma test runner
│   ├─ webpack.common.js            // common webpack configuration for the development and production configurations
│   ├─ webpack.dev.js               // webpack configuration for development; extends webpack.common.js
│   ├─ webpack.prod.js              // webpack configuration for bundling our application for production
│   └─ webpack.test.js              // webpack configuration needed to bundle our code for testing
├─ public ...                       // Common location for media files, fonts and 3rd party source files.
│                                   // Note that this folder will not be copied to the dist folder as
│                                   // part of the build process. Instead, Webpack will copy all referenced resources
│                                   // to /dist/asset and update their associated reference appropriately
├─ src
│   ├─ app                          // application folder
│   │   ├─ readme ...               // implementation of the ReadmeComponent
│   │   ├─ app.component.html       // the template for the AppComponent
│   │   ├─ app.component.sass       // styles for the AppComponent
│   │   ├─ app.component.ts         // defines the AppComponent; the root component for our app
│   │   ├─ app.module.ts            // defines the AppModule which pulls our app together by bootstrapping
│   │   │                           // the AppComponent, and registering app dependencies
│   │   ├─ app.routing.ts           // defines routing for the AppModule
│   │   └─ index.ts                 // main entry-point of our application responsible for bootstrapping the AppModule
│   ├─ styles                       // defines styles for the entire app
│   │   ├─ _fonts.sass              // font definitions
│   │   ├─ _material.sass           // all Material Design styles
│   │   ├─ _theming.sass            // defines a Material Design theme
│   │   └─ index.sass               // the root Sass module for our global styles
│   ├─ global.d.ts                  // defines any missing TypeScript type definitions
│   ├─ index.ejs                    // template that defines the apps index.html
│   ├─ main.ts                      // responsible for loading and bootstrapping our app
│   └─ polyfill.ts                  // imports all polyfills that are needed for Angular 2 to work in older browsers
│
├─ .editorconfig                    // defines a base coding style to be applied to files throughout the project
│                                   // the format is automatically recognized by many IDEs
├─ karma.conf.js                    // defines the Karma test runner configuration
├─ package.json                     // npm module configuration; details project dependencies, metadata and scripts
├─ tsconfig.json                    // configures the TypeScript compiler
├─ tslint.json                      // configures the TypeScript linter TSLint (http://palantir.github.io/tslint/)
└─ webpack.config.js                // defines the default Webpack configuration
```

### File Naming Conventions

| Type                 | File Name                        | Class Name             |
| -------------------- | -------------------------------- | ---------------------- |
| Component            | `fancy-pants.component.ts`       | `FancyPantsComponent`  |
| Component Styles     | `fancy-pants.component.sass`     | —                      |
| Component Template   | `fancy-pants.component.html`     | —                      |
| Component Unit Test  | `fancy-pants.component.spec.ts`  | —                      |
| Interface            | `fancy-pants.interface.ts`       | `FancyPantsInterface`  |
| Module               | `fancy-pants.module.ts`          | `FancyPantsModule`     |
| Router               | `fancy-pants.routing.ts`         | —                      |
| Service              | `fancy-pants.service.ts`         | `FancyPantsService`    | 
| Service Unit Test    | `fancy-pants.service.spec.ts`    | —                      |

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
    'polyfills': './src/polyfills.ts',
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