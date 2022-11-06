const fs = require('fs');

const pathCopyFrom = __dirname + '\\styles\\';
const pathCopyTo = __dirname + '\\project-dist\\';
let content = "";

fs.readdir(pathCopyFrom, { withFileTypes: true }, (err, files) => {
  files.forEach(file => {
    if (file.isFile() && file.name.match(/.\w+$/i)[0].slice(1) === "css") {
      fs.readFile(`${pathCopyFrom}\\${file.name}`, 'utf8', (err, data) => {
        content += data;
        fs.writeFile(`${pathCopyTo}\\bundle.css`, content, () => { });
      });
    }
  });
});
