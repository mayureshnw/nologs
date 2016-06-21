# nologs
A simple script that will remove logs in all js files in the directory. + a github webhook that will do it for you

## Usage
If you want the source to be rewritten
```
$ jscodeshift -t transform.js test.js -p
```

If you would like to keep the source intact
```
$ jscodeshift -t transform.js test.js -p -d
```

test.js is javascript file that you want to remove the logs from
