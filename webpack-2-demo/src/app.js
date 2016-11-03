'use strict';

var _ = require('lodash');

var array = [1];
var other = _.concat(array, 2, [3], [[4]]);

console.log(other); //[1, 2, 3, [4]]