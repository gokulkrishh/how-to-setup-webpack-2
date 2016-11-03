'use strict';

var array = require('lodash/array'); //Lets require only array src from lodash

var array = [1];
var other = _.concat(array, 2, [3], [[4]]);

console.log(other); //[1, 2, 3, [4]]