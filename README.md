# how to setup webpack 2

Tutorial to setup [webpack 2 (beta)](https://webpack.github.io/docs/roadmap.html) from scratch based on this [medium article](https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783#.3dou6bawv) by [Drew Powers](https://blog.madewithenvy.com/@an_ennui) and other few articles.

## Table of content

### Setup & Installation

### **```Step 1```**

Create a folder called ```webpack-2-demo``` and cd into it

```bash
$ mkdir webpack-2-demo && cd webpack-2-demo
```

### **```Step 2```**

```bash
$ npm install --dev-save webpack@2.1.0-beta.25 webpack-dev-server@2.1.0-beta.9
```

or do it via [Yarn](https://yarnpkg.com/)

```bash
$ yarn add --dev webpack@2.1.0-beta.25 webpack-dev-server@2.1.0-beta.9
```

### **```Step 3```**

Create a ```webpack.config.js``` in root of our directory and let's write some configuration.

```js
var webpack = require('webpack');

module.exports = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    app: './app.js',
  },
  output: {
    path: __dirname + '/dist', // `dist` is the destination
    filename: '[name].bundle.js',
  },
};
```

Add [lodash](https://lodash.com) to dependencies in ```package.json``` by

```bash
$ npm install --save-dev lodash
```

And let's write some code in ```src/app.js```

```js
var array = require('lodash/array'); //Lets require only array src from lodash

var array = [1];
var other = _.concat(array, 2, [3], [[4]]);

console.log(other); //[1, 2, 3, [4]]
```

### **```Step 4```**

To run webpack in development mode

```bash
$ webpack
```

or run webpack in production mode

```bash
$ webpack -p
```

- ```p``` is for production which uglifies and minifies files.

### **```Step 5```**

Webpack has its own development server. Lets setup that in ```webpack.config.js```

```js
devServer: {
  contentBase: __dirname + "/src",
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

### **```Step 6```**

Run development server by

```bash
$ webpack-dev-server
```

Thats all basic webpack config is done. But what about ```babel, ES6``` loaders ? How to setup that ?

##### WIP

