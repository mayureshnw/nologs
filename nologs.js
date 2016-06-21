#!/usr/bin/env node

var fs = require('fs');
var program = require('commander');
var exec = require('child_process').exec;

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

var parseJsFiles = function(dir){
  console.log(typeof(dir));
  // var fileList = walk(dir);
  // fileList.forEach((file)=>{
  //   child_process.execSync(jscodeshift,['-t','transform.js','file','-p','-d'])
  // })
}

var rewrite = function(fileList){

}

program
  .command('dir [dir]')
  .description('Give the directory to remove console.log')
  .action(function(dir){
    var fileList = walk(dir);
    fileList.forEach((file)=>{
      // execSync('jscodeshift',['-t','transform.js','file','-p','-d']);
      exec(`jscodeshift -t transform.js ${file} -p -d`, function(err,stdout, stderr ){
        console.log(stdout);
      });
    })
  });

//
program
  .version('0.0.1')
  .option('-o, --ovr', 'Original files will be overwritten with output')
  .parse(process.argv);
