
var assert = require('assert');

function Test() {
    this.ok = function () {
        return assert.ok.apply(assert, arguments);
    }
    
    this.equal = function () {
        return assert.equal.apply(assert, arguments);
    }
}

module.exports = function () {
    return new Test();
};