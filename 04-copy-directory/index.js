const fs = require('fs');
const path = require('path');

const pathCopyFrom = path.join(__dirname, 'files');
const pathCopyTo = path.join(__dirname, 'files-copy');

fs.rm(pathCopyTo, { recursive: true, force: true }, () => {
  fs.mkdir(pathCopyTo, { recursive: true }, () => { });

  fs.readdir(pathCopyFrom, { withFileTypes: false }, (err, files) => {
  
    console.log("\nТекущие файлы:");
    files.forEach(file => {
      fs.copyFile(path.join(pathCopyFrom, file), path.join(pathCopyTo, file), () => {
        console.log(`Файл ${file} скопирован`);
      });
    });
  });
});

