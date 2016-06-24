# nologs
A simple script that will remove logs in all js files in the directory. + a github webhook that will do it for you

## Installation
`npm install -g nologs`

## Usage

General Usage
```
Usage: nologs [options] [command]


  Commands:

    file [options] [path]  Give the directory to remove console.
    dir [options] [dir]    Give the directory to remove console.log
    here [options]         takes the current directory to remove logs

  Options:

    -h, --help        Output usage information
    -V, --version     Output the version number
    -o, --overwrite   Original files will be overwritten with output
    -i, --ignore      Ignore files from gitignore
```

To remove logs from file
```
$ nologs file filename.js
```

To remove logs from directory
```
$ nologs dir /path/to/dir
```
Incase removing logs from a git repository, use the ` -i ` flag to ignore files or folders according to .gitignore
