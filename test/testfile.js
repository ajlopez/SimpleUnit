
var simpleunit = require('..'),
    path = require('path'),
    assert = require('assert');

var onefunction = require('./files/onefunction');

assert.equal(onefunction.counter, 0);

simpleunit.test(path.resolve(__dirname, './files/onefunction.js'));

assert.equal(onefunction.counter, 1);