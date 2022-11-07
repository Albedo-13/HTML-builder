const fs = require('fs');

const pathCopyFrom = __dirname + '\\files\\';
const pathCopyTo = __dirname + '\\files-copy\\';

fs.rm(pathCopyTo, { recursive: true, force: true }, () => {
  fs.mkdir(pathCopyTo, { recursive: true }, () => { });

  fs.readdir(pathCopyFrom, { withFileTypes: false }, (err, files) => {
  
    console.log("\nТекущие файлы:");
    files.forEach(file => {
      fs.copyFile(pathCopyFrom + `${file}`, pathCopyTo + `${file}`, () => {
        console.log(`Файл ${file} скопирован`);
      });
    });
  });
});

