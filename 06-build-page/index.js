// https://github.com/Albedo-13/HTML-builder/tree/HTML-builder/06-build-page
// https://github.com/EvgeniiMal/HTML-builder/wiki/%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B0-06-build-page
// https://bobbyhadz.com/blog/node-js-replace-string-in-file



//! КОД НЕ РАБОТАЕТ! МОЖНО НЕ ПРОВЕРЯТЬ!

// Закоммитил, чтобы не потерять. Застрял на вставке компонентов в
// .html макет. Нужно на строке 67 сделать асинхронный цикл 
// синхронным через async/await, чтобы повторить поведение
// закомментированного кода в самом низу.
// Думаю из-за асинхронности периодически и выдает ошибку, что 
// data === undefined. Не успевает прочесть?


const fs = require('fs');
const path = require('path');

const pathProjectDist = __dirname + `\\project-dist\\`;
const pathAssets = __dirname + `\\assets\\`;
const pathStyles = __dirname + `\\styles\\`;
const pathComponents = __dirname + `\\components\\`;


fs.rm(pathProjectDist, { recursive: true, force: true }, () => {

  // COPY ASSETS FOLDER
  fs.readdir(pathAssets, { withFileTypes: true }, (err, dirs) => {
    fs.mkdir(pathProjectDist + `\\assets\\`, { recursive: true }, () => { });
    dirs.forEach(dir => {
      // console.log(dir.name);

      if (dir.isDirectory()) {
        fs.mkdir(pathProjectDist + `\\assets\\${dir.name}\\`, { recursive: true }, () => { });
        fs.readdir(pathAssets + `\\${dir.name}\\`, { withFileTypes: true }, (err, files) => {
          files.forEach(file => {
            // console.log(`${dir.name} / ${file.name}`);
            fs.copyFile(pathAssets + `${dir.name}\\${file.name}`, pathProjectDist + `assets\\${dir.name}\\${file.name}`, () => { });
          });
        });
      } else {
        // console.log("file");
        fs.copyFile(pathAssets + `${dir.name}`, pathProjectDist + `assets\\${dir.name}`, () => { });
      }
    });
  });

  // COPY & MERGE CSS STYLES
  let content = "";
  fs.readdir(pathStyles, { withFileTypes: true }, (err, files) => {
    files.forEach(file => {
      if (file.isFile() && file.name.match(/.\w+$/i)[0].slice(1) === "css") {
        fs.readFile(`${pathStyles}\\${file.name}`, 'utf8', (err, data) => {
          content += data;
          fs.writeFile(`${pathProjectDist}\\style.css`, content, () => { });
        });
      }
    });
  });

  // COPY & INSERT HTML COMPONENTS
  fs.readdir(pathComponents, { withFileTypes: true }, (err, files) => {
    fs.copyFile(__dirname + `\\template.html`, pathProjectDist + `\\template.html`, function() {
      // Тут ошибка. Ниже в цикле нужно синхронное поведение
      // TODO: проверка на расширение .html
      files.forEach(function (file) {

        let fileName = file.name.match(/^\w+./i)[0].slice(0, -1);
        console.log(fileName);

        fs.readFile(pathProjectDist + `template.html`, 'utf8', function(err, data) {
          let replaced = data.replace(`{{${fileName}}}`, `REPLACE TEXT`);
          console.log(`{{${fileName}}}`);
          fs.writeFile(pathProjectDist + `template.html`, replaced, 'utf8', () => {
            console.log(`REPLACED: {{${fileName}}}`);
          });
        });
      });
    });

  });





  // fs.readFile(__dirname + '\\example.txt', 'utf-8', function (err, contents) {
    
  //   const replaced = contents.replace(/to be replaced/g, 'replacement');

  //   fs.writeFile(__dirname + '\\example1.txt', replaced, 'utf-8', function (err) {

  //   });

  //   fs.readFile(__dirname + '\\example.txt', 'utf-8', function (err, contents) {
  
  //     const replaced = contents.replace(/other other shit/g, 'rainy day');
  
  //     fs.writeFile(__dirname + '\\example1.txt', replaced, 'utf-8', function (err) {

  //     });
  //   });
  // });



});


