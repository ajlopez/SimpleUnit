
var simpleunit = require('..'),
    path = require('path'),
    assert = require('assert');
    
// test module with one function

var onefunction = require('./files/onefunction');

assert.equal(onefunction.counter, 0);

simpleunit.test(path.resolve(__dirname, './files/onefunction.js'));

assert.equal(onefunction.counter, 1);

// test module with two functions

var twofunctions = require('./files/twofunctions');

assert.equal(twofunctions.counter1, 0);
assert.equal(twofunctions.counter2, 0);

simpleunit.test(path.resolve(__dirname, './files/twofunctions.js'));

assert.equal(twofunctions.counter1, 1);
assert.equal(twofunctions.counter2, 1);
