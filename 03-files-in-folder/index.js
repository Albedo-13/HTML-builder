const fs = require('fs');

const path = __dirname + '\\secret-folder\\';

fs.readdir(path, { withFileTypes: true }, (err, files) => {
  console.log("\nТекущие файлы:");
  
  files.forEach(file => {
    if (file.isFile()) {
      
      fs.stat(path + `\\${file.name}`, (err, fileInfo) => {
        let fileName = file.name.match(/^\w+./i)[0].slice(0, -1);
        let fileExt = file.name.match(/.\w+$/i)[0].slice(1);
        let fileSize = parseFloat(fileInfo.size / 1024).toFixed(3) + " KB";

        console.log(`${fileName} - ${fileExt} - ${fileSize}`);
      });
    }
  });
});