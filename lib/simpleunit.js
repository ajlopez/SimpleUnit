
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

function testDirectory(dirname, options) {
    options = options || { };
    
    fs.readdirSync(dirname).forEach(function (filename) {
        filename = path.join(dirname, filename);
        
        if (!isFile(filename))
            return;
            
        if (path.extname(filename) !== '.js')
            return;
            
        testFile(filename, options);
    });
}

function testFile(filename, options) {
    options = options || { };
    
    if (isDirectory(filename))
        return testDirectory(filename, options);
        
    var file = require(path.resolve(filename));
    
    for (var n in file) {
        var fn = file[n];
        
        if (typeof fn != 'function')
            continue;
            
        fn(test());
    }
        
    if (options.verbose)
        console.log(path.basename(filename) + ': pass');
}

module.exports = {
    test: testFile
};

