var fs = require('fs');

var walk = function(dir) {
    var results = []
    var list = fs.readdirSync(dir)
    list.forEach(function(file) {
        var ext = file.split('.');
        var isJs = ext[ext.length - 1] === "js";
        if (isJs) {
            file = dir + '/' + file
            var stat = fs.statSync(file)
            if (stat && stat.isDirectory()) results = results.concat(walk(file))
            else results.push(file)
        }
    })
    return results
}

// console.log(__dirname);
