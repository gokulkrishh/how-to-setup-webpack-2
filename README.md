# [How To Setup Webpack 2](https://gokulkrishh.github.io/webpack/2017/02/03/how-to-setup-webpack-2.html)

> Simple tutorial on how to setup webpack v2.

## Read my blog post on [how to setup webpack 2](https://gokulkrishh.github.io/webpack/2017/02/03/how-to-setup-webpack-2.html)

## Table of content

1. [Create folder](#step-1---create-folder)
1. [Install webpack](#step-2---install-webpack)
1. [Write webpack config](#step-3---write-webpack-config)
1. [Run the webpack](#step-4---run-the-webpack)
1. [Setup webpack development server](#step-5---setup-webpack-development-server)
1. [Run development server](#step-6---run-development-server)
1. [Setup development & production env](#step-7---setup-dev--prod-environment)
1. [Sourcemap for development & production](#step-8---sourcemap-for-dev--prod)

### Setup & Installation

### **```Step 1```** - Create folder

Create a folder called ```webpack-2-demo``` and cd into it.

```bash
$ mkdir webpack-2-demo && cd webpack-2-demo
```

### **```Step 2```** - Install webpack

```bash
$ npm install --save-dev webpack@latest webpack-dev-server@latest
```

or do it via [Yarn](https://yarnpkg.com/)

```bash
$ yarn add --dev webpack@latest webpack-dev-server@latest
```

### **```Step 3```** - Write webpack config

Create a ```webpack.config.js``` in root of our directory and let's write some configuration.

```js
var webpack = require('webpack');

var config = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    app: './app.js',
  },
  output: {
    path: __dirname + '/dist', // `dist` is the destination
    filename: '[name].bundle.js',
  },
};

module.exports = config;
```

Now lets add [lodash](https://lodash.com) to dependencies in ```package.json``` by.

```bash
$ yarn add --dev lodash
```

And let's write some code in ```src/app.js```

```js
var _ = require('lodash');

var array = [1];
var other = _.concat(array, 2, [3], [[4]]);

console.log(other); //[1, 2, 3, [4]]
```

### **```Step 4```** - Run the webpack

To run webpack in ```development mode```.

```bash
$ webpack
```

*Screenshot of development server*

<img src="https://raw.githubusercontent.com/gokulkrishh/how-to-setup-webpack-2/master/webpack.png" style="max-width: 100%" />

**Total Size:** 208KB

or run webpack in ```production mode```.

```bash
$ webpack -p
```

- ```p``` is for production which uglifies and minifies files.

*Screenshot of development server*

<img src="https://raw.githubusercontent.com/gokulkrishh/how-to-setup-webpack-2/master/webpack-p.png" style="max-width: 100%" />

**Total Size:** 38KB

### **```Step 5```** - Setup webpack development server

Webpack has its own development server. Lets setup that in ```webpack.config.js``` by adding the following.

```js
devServer: {
  open: true, // to open the local server in browser
  contentBase: __dirname + '/src',
},
```

And add the script for ```bundle.js``` in ```src/index.html```.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Webpack 2 Demo</title>
</head>
<body>
		
  <script src="/assets/bundle.js"></script>
</body>
</html>
```

### **```Step 6```** - Run development server

Run development server.

```bash
$ webpack-dev-server
```

Open [http://localhost:8080/](http://localhost:8080/) in your browser.

Thats all basic webpack config is done. But what about ```SASS, IMAGES, ES6``` loaders ? How to setup that ? Lets see.

### Loaders

Lets set up ```ES6 + Babel``` using a webpack loader.

### **```Step 1```** - Install babel loader,core & ES6 preset.

```bash
$ npm install --save-dev babel-loader babel-core babel-preset-es2015
```
After installation, We have to add config to ```webpack.config.js``` file.

### **```Step 2```** - ES6 Loader

```js
module: {
  rules: [
    {
      test: /\.js$/, //Check for all js files
      loader: 'babel-loader',
      query: {
        presets: [ "babel-preset-es2015" ].map(require.resolve)
      }
    }
  ]
}
```

In order to check babel loader, we will change ```app.js``` to ES6 syntax.

```js
'use strict';

import _ from 'lodash'; //ES6 import to check our babel loader

const array = [1];
const other = _.concat(array, 2, [3], [[4]]);

console.log(other); //[1, 2, 3, [4]]
```

Run the development server and check the console.

```bash
$ webpack-dev-server
```

### **```Step 3```** - SASS & CSS Loader

Install SASS & CSS Loader

```bash
$ npm install --save-dev css-loader style-loader sass-loader node-sass
```

SASS & CSS loader config for webpack is below.

```js
module: {
  rules: [{
    test: /\.(sass|scss)$/, //Check for sass or scss file names
    use: [
      'style-loader',
      'css-loader',
      'sass-loader',
    ]
  }]
}
```

After `loaders`, final steps are setting up sourcemaps and env for webpack.

### **```Step 7```** - Setup Dev & Prod Environment

In `package.json` file, lets add scripts to run our dev server and build with env.

```json
"scripts": {
  "start": "webpack-dev-server",
  "build": "NODE_ENV=production webpack -p --config webpack.config.js"
}
```

`NODE_ENV=production` is environment set for build. Using `process.env.NODE_ENV`, we can check the env in webpack.

### **```Step 8```** - Sourcemap for Dev & Prod

Now we know when we are running production build or development. Lets use it to setup the sourcemap accordingly.

```js

var config = {
  devtool: "eval-source-map" // Default development sourcemap
};

// Check if build is running in production mode, then change the sourcemap type
if (process.env.NODE_ENV === "production") {
  config.devtool = "source-map";
}

module.exports = config;
```

More information on [sourcemaps](http://erikaybar.name/webpack-source-maps-in-chrome/?utm_source=javascriptweekly&utm_medium=email)

### **```Final```**

Final step contains all the config for webpack from above.

```js
'use strict';
var webpack = require('webpack');

var config = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    app: './app.js',
  },
  output: {
    path: __dirname + '/dist', // `dist` is the destination
    filename: 'bundle.js',
    publicPath: "/assets",
  },
  module: {
    rules: [
      {
        test: /\.js$/, //Check for all js files
        loader: 'babel-loader',
        query: {
          presets: [ "babel-preset-es2015" ].map(require.resolve)
        }
      },
      {
        test: /\.(sass|scss)$/, //Check for sass or scss file names
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      { 
        test: /\.json$/, 
        loader: "json-loader"  //JSON loader
      }
    ]
  },
  //To run development server
  devServer: {
    contentBase: __dirname + '/src',
  },

  devtool: "eval-source-map" // Default development sourcemap
};

// Check if build is running in production mode, then change the sourcemap type
if (process.env.NODE_ENV === "production") {
  config.devtool = "source-map";

  // Can do more here
  // JSUglify plugin
  // Offline plugin
  // Bundle styles seperatly using plugins etc,
}

module.exports = config;
```

Thats all. Thanks for reading my repo. 

#### Articles 

- [Getting started with webpack 2](https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783#.3dou6bawv)
- [Webpack examples](https://github.com/webpack/webpack/tree/master/examples)
- [Moving to webpack 2](http://javascriptplayground.com/blog/2016/10/moving-to-webpack-2/)
