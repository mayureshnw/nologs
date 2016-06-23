#!/usr/bin/env node

exports.nologs = function() {
    const fs = require('fs');
    const program = require('commander');
    const exec = require('child_process').exec;

    const walk = (dir) => {
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

    const removeFromDir = (dir) => {
        var fileList = walk(dir);
        fileList.forEach((file) => {
            exec(`jscodeshift -t transform.js ${file} -p -d`, function(err, stdout, stderr) {
                (err) ? console.log(stderr): console.log(stdout);;
            });
        });
    }


    const removeFromFile = (file) => {
        exec(`jscodeshift -t transform.js ${file} -p -d`, function(err, stdout, stderr) {
            (err) ? console.log(stderr): console.log(stdout);;
        });
    }
    program
        .command('dir [dir]')
        .description('Give the directory to remove console.log')
        .action(function(dir) {
            removeFromDir(dir);
        });

    program
        .command('current')
        .description('takes the current directory to remove logs')
        .action(function() {
            removeFromDir(__dirname);
        });

    program
        .command('file [path]')
        .description('Give the directory to remove console.log')
        .action(function(path) {
            removeFromFile();
        });

    program
        .version('0.0.1')
        .option('-o, --ovr', 'Original files will be overwritten with output')
        .parse(process.argv);

}
