var fs = require('fs');
var files = fs.readdirSync('src/app/');
determinePaths(files);

function determinePaths(files) {
    console.log(files);
    return files;
};

