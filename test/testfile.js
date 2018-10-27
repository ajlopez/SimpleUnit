
var simpleunit = require('..'),
    path = require('path'),
    assert = require('assert');
    
// test module with one function

var onefunction = require('./files/onefunction');
var twofunctions = require('./files/twofunctions');
var threefunctions = require('./files/subdir/threefunctions');
var asyncfunction = require('./files/asyncfunction');

assert.equal(onefunction.counter, 0);
assert.equal(twofunctions.counter1, 0);
assert.equal(twofunctions.counter2, 0);
assert.equal(threefunctions.counter1, 0);
assert.equal(threefunctions.counter2, 0);
assert.equal(threefunctions.counter3, 0);
assert.equal(asyncfunction.asynccounter, 0);

simpleunit.test(path.resolve(__dirname, './files/onefunction.js'), function (err, result) {
    assert.equal(err, null);
    assert.equal(onefunction.counter, 1);
    step2();
});

// test module with two functions

function step2() {
    assert.equal(twofunctions.counter1, 0);
    assert.equal(twofunctions.counter2, 0);

    simpleunit.test(path.resolve(__dirname, './files/twofunctions.js'), function (err, result) {
        assert.equal(err, null);
        assert.equal(twofunctions.counter1, 1);
        assert.equal(twofunctions.counter2, 1);
        step3();
    });
}

// test modules in directory

function step3() {
    simpleunit.test(path.resolve(__dirname, './files'), function (err, result) {
        assert.equal(err, null);
        assert.equal(onefunction.counter, 2);
        assert.equal(twofunctions.counter1, 2);
        assert.equal(twofunctions.counter2, 2);
        assert.equal(threefunctions.counter1, 0);
        assert.equal(threefunctions.counter2, 0);
        assert.equal(threefunctions.counter3, 0);
        assert.equal(asyncfunction.asynccounter, 1);
        step4();
    });
}

// test modules in directory and subdirectory

function step4() {
    simpleunit.test(path.resolve(__dirname, './files'), function (err, result) {
        assert.equal(err, null);
        assert.equal(onefunction.counter, 3);
        assert.equal(twofunctions.counter1, 3);
        assert.equal(twofunctions.counter2, 3);
        assert.equal(threefunctions.counter1, 1);
        assert.equal(threefunctions.counter2, 1);
        assert.equal(threefunctions.counter3, 1);
        assert.equal(asyncfunction.asynccounter, 2);
    }, { recursive: true });
}
