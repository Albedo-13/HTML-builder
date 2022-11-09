const fs = require('fs');
const path = require('path');

const pathCopyFrom = path.join(__dirname, 'styles');
const pathCopyTo = path.join(__dirname, 'project-dist');
let content = "";

fs.readdir(pathCopyFrom, { withFileTypes: true }, (err, files) => {
  files.forEach(file => {
    if (file.isFile() && file.name.match(/.\w+$/i)[0].slice(1) === "css") {
      fs.readFile(path.join(pathCopyFrom, file.name), 'utf8', (err, data) => {
        content += data;
        fs.writeFile(path.join(pathCopyTo, "bundle.css"), content, () => { });
      });
    }
  });
});
