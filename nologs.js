#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const exec = require('child_process').exec;

const removeFromDir = (dir, option, ignore) => {
    const overwrite = (option) ? '' : '-d -p';
    const ign = (ignore) ? '' : '--ignore-config .gitignore';
    exec(`jscodeshift -t transform.js ${dir} ${overwrite} ${ignore}`, function(err, stdout, stderr) {
        (err) ? console.error(stderr): console.info(stdout);
    });
}


const removeFromFile = (file, option, ignore) => {
    const overwrite = (option) ? '' : '-d -p';
    const ign = (ignore) ? '' : '--ignore-config .gitignore';
    exec(`jscodeshift -t transform.js ${file} ${overwrite} ${ignore}`, function(err, stdout, stderr) {
        (err) ? console.error(stderr): console.info(stdout);
    });
}

program
    .command('file [path]')
    .option('-o, --overwrite', 'Original files will be overwritten with output')
    .option('-i, --ignore', 'Ignore files from gitignore')
    .description('Give the directory to remove console.')
    .action(function(path, options) {
        removeFromFile(path, options.overwrite, options.ignore);
    })


program
    .command('dir [dir]')
    .option('-o, --overwrite', 'Original files will be overwritten with output')
    .option('-i, --ignore', 'Ignore files from gitignore')
    .description('Give the directory to remove console.log')
    .action(function(dir, options) {
        removeFromDir(dir, options.overwrite, options.ignore);
    });

program
    .command('here')
    .option('-o, --overwrite', 'Original files will be overwritten with output')
    .option('-i, --ignore', 'Ignore files from gitignore')
    .description('takes the current directory to remove logs')
    .action(function(options) {
        console.log(__dirname);
        removeFromDir(__dirname, options.overwrite, options.ignore);
    });

program
    .version('0.0.1')
    .parse(process.argv);

if (!program.args.length) program.help();
