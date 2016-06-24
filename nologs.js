#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');
const exec = require('child_process').exec;

const removeFromFile = (file, option, ignore) => {
    const overwrite = (option) ? '' : '-d -p';
    const ign = (ignore) ? '--ignore-config .gitignore' : '';
    exec(`jscodeshift -t transform.js ${file} ${overwrite} ${ign}`, function(err, stdout, stderr) {
        (err) ? console.error(stderr): console.info(stdout);
    });
}

program
    .command('file [path]')
    .option('-o, --overwrite', 'Original files will be overwritten with output')
    .description('Give the directory to remove console.')
    .action(function(path, options) {
        removeFromFile(path, options.overwrite, false);
    })


program
    .command('dir [dir]')
    .option('-o, --overwrite', 'Original files will be overwritten with output')
    .option('-i, --ignore', 'Ignore files from gitignore')
    .description('Give the directory to remove console.log')
    .action(function(dir, options) {
        removeFromFile(dir, options.overwrite, options.ignore);
    });

program
    .command('here')
    .option('-o, --overwrite', 'Original files will be overwritten with output')
    .option('-i, --ignore', 'Ignore files from gitignore')
    .description('takes the current directory to remove logs')
    .action(function(options) {
        removeFromFile(__dirname, options.overwrite, options.ignore);
    });

program
    .version('0.0.1')
    .parse(process.argv);

if (!program.args.length) program.help();
