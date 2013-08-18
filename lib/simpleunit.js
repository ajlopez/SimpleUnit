
var test = require('./test'),
    path = require('path'),
    fs = require('fs');

function isFile(filename)
{
    try {
        var stats = fs.lstatSync(filename);
        return stats.isFile();
    }
    catch (err)
    {
        return false;
    }
}

function isDirectory(filename)
{
    try {
        var stats = fs.lstatSync(filename);
        return stats.isDirectory();
    }
    catch (err)
    {
        return false;
    }
}

function testDirectory(dirname) {
    fs.readdirSync(dirname).reverse().forEach(function (filename) {
        filename = path.join(dirname, filename);
        
        if (!isFile(filename))
            return;
            
        if (path.extname(filename) !== '.js')
            return;
            
        testFile(filename);
    });
}

function testFile(filename) {
    if (isDirectory(filename))
        return testDirectory(filename);
        
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

