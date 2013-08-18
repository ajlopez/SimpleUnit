
var test = require('./test');

function testFile(filename) {
    var file = require(filename);
    
    for (var n in file) {
        var fn = file[n];
        
        if (typeof fn != 'function')
            continue;
            
        fn(test());
    }
}

module.exports = {
    test: testFile
};