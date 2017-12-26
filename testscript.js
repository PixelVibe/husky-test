var fs = require('fs');
var path = require('path');
var errCount = 0;

/*This function accepts directory path & file types as arguments & returns an array with list of
all the matching files found within the directory.
1st parameter should be the directory path in string format
2nd parameter should be an array of extensions of the file types that you want to search for.
It should be an array of strings. */
function getFilesFromDir(dir, fileTypes) {
  var filesToReturn = [];
  function walkDir(currentPath) {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
      var curFile = path.join(currentPath, files[i]);      
      if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
        filesToReturn.push(curFile.replace(dir, ''));
      } else if (fs.statSync(curFile).isDirectory()) {
       walkDir(curFile);
      }
    }
  };
  walkDir(dir); 
  return filesToReturn;
}

/*This function checks the naming convention for components*/
function checkComponentNamingFormat() {
  getFilesFromDir("src/app/components", [".ts",".html",".css"]).forEach(function(item, index) {
    var componentName = path.basename(path.dirname(item)) + '.component';
    var fileName = (item.split(/[\\/]/).pop()).replace(/.*\/|\.[^.]*$/g, '');
    if(componentName.indexOf(fileName) >= 0) {
      console.log("PASS: ", item);
    } else {
      console.log("FAIL: ", item);
      errCount++;
    }
  });
  if (errCount) {
    throw 'ERROR: ' + errCount + ' file(s) have incorrect file name. Please follow the coding guidelines.';
  }
}

checkComponentNamingFormat();