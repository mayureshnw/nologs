#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const exec = require('child_process').exec;

const walk = (dir, option) => {
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

const removeFromDir = (dir, option) => {
    overwrite = (option) ? '' : '-d';
    var fileList = walk(dir);
    fileList.forEach((file) => {
        exec(`jscodeshift -t transform.js ${file} ${overwrite}`, function(err, stdout, stderr) {
          (err) ? console.error(stderr) : console.info(stdout);
        });
    });
}


const removeFromFile = (file, option) => {
    overwrite = (option) ? '' : '-d';
    exec(`jscodeshift -t transform.js ${file} ${overwrite}`, function(err, stdout, stderr) {
      (err) ? console.error(stderr) : console.info(stdout);
    });
}

program
    .command('file [path]')
    .option('-o, --overwrite', 'Original files will be overwritten with output')
    .description('Give the directory to remove console.')
    .action(function(dir, options) {
    removeFromFile(file, options.overwrite)
})


program
    .command('dir [dir]')
    .option('-o, --overwrite', 'Original files will be overwritten with output')
    .description('Give the directory to remove console.log')
    .action(function(dir) {
        removeFromDir(dir, options.overwrite);
    });

program
    .command('here')
    .option('-o, --overwrite', 'Original files will be overwritten with output')
    .description('takes the current directory to remove logs')
    .action(function(options) {
        removeFromDir(__dirname, options.overwrite);
    });

program
    .version('0.0.1')
    .parse(process.argv);

if (!program.args.length) program.help();
