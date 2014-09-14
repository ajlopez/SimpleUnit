
var test = require('./test');
var path = require('path');
var fs = require('fs');
var colors = require('colors');

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

function testDirectory(dirname, cb, options) {
    options = options || { };
    
    var filenames = fs.readdirSync(dirname);
    
    processFile();
    
    function processFile() {
        while (filenames.length) {
            var filename = filenames.shift();
            filename = path.join(dirname, filename);

            if (!isFile(filename))
                continue;
                
            if (path.extname(filename) !== '.js')
                continue;
                
            testFile(filename, function() {
                processFile();
            }, options);
            
            return;
        }
        
        cb(null, null);
    }
}

function testFile(filename, cb, options) {
    options = options || { };
    
    if (isDirectory(filename))
        return testDirectory(filename, cb, options);
        
    console.log(path.basename(filename));
    
    var file = require(path.resolve(filename));
    
    var fns = [];
    
    for (var n in file) {
        var fn = file[n];
        
        if (typeof fn != 'function')
            continue;
            
        fns.push({ name: n, fn: fn });
    }
    
    var counter = 50;
    var fntest;
    
    function doTest() {
        while (fns.length) {
            var fn = fns.shift();
            process.stdout.write((' ' + fn.name + ' ').grey);
            fntest = test();
        
            fn.fn(fntest);
            
            if (fntest.isAsync && !fntest.isDone) {
                if (fntest.timeout)
                    counter = Math.floor(fntest.timeout / 100);
                else
                    counter = 50;
                    
                setTimeout(doStep, 100);
                
                return;                
            }
            else
                console.log("OK".green);
        }
        
        console.log(path.basename(filename) + ': pass');
            
        cb(null, null);
    }    

    var doStep = function () {
        if (fntest.isDone) {
            console.log("OK".green);
            doTest();
            return;
        }
        
        counter--;
        
        if (counter <= 0) {
            console.log("Error".red);
            console.log(path.basename(filename) + ': error');
            cb('error', null);
            return;
        }
        
        setTimeout(doStep, 100);
    }
    
    doTest();
}

module.exports = {
    test: testFile
};

