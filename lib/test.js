
var assert = require('assert');

function Test() {
    for (var n in assert) {
        var fn = assert[n];
        
        if (typeof fn !== 'function')
            continue;
            
        this[n] = makeWrapper(fn);
    }
    
    function makeWrapper(fn) {
        return function () {
            return fn.apply(assert, arguments);
        }
    }
    
    this.async = function (timeout) {
        this.isAsync = true;
        this.isDone = false;
        
        if (timeout)
            this.timeout = timeout;
    }
    
    this.done = function () {
        this.isDone = true;
    }
}

module.exports = function () {
    return new Test();
};

