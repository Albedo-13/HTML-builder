// https://github.com/Albedo-13/HTML-builder/tree/HTML-builder/06-build-page
// https://github.com/EvgeniiMal/HTML-builder/wiki/%D0%9F%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B0-06-build-page
// https://bobbyhadz.com/blog/node-js-replace-string-in-file
// https://learn.javascript.ru/async-await


//! КОД НЕ РАБОТАЕТ! МОЖНО НЕ ПРОВЕРЯТЬ!


// Закоммитил, чтобы не потерять. Застрял на вставке компонентов в
// .html макет. Нужно сделать асинхронный цикл 
// синхронным через async/await, чтобы повторить поведение
// закомментированного кода в самом низу.
// Думаю из-за асинхронности периодически и выдает ошибку, что 
// data === undefined. Не успевает прочесть?


const fs = require('fs');
const path = require('path');

const pathProjectDist = path.join(__dirname, `project-dist`);
const pathAssets = path.join(__dirname, `assets`);
const pathStyles = path.join(__dirname, `styles`);
const pathComponents = path.join(__dirname, `components`);


(async function () {
  await copyAssets();// работает со второго раза. Рекурсия?
  await copyStyles();
  await copyHTML();
})();

function copyAssets() {
  fs.readdir(pathAssets, { withFileTypes: true }, (err, dirs) => {
    fs.mkdir(path.join(pathProjectDist, "assets"), { recursive: true }, () => { });//! сюда для 1 раза
    dirs.forEach(dir => {
      // console.log(dir.name);

      if (dir.isDirectory()) {
        fs.mkdir(path.join(pathProjectDist, "assets", dir.name), { recursive: true }, () => { });
        fs.readdir(path.join(pathAssets, dir.name), { withFileTypes: true }, (err, files) => {
          files.forEach(file => {
            // console.log(`${dir.name} / ${file.name}`);
            fs.copyFile(path.join(pathAssets, dir.name, file.name), path.join(pathProjectDist, "assets", dir.name, file.name), () => { });
          });
        });
      } else {
        // console.log("file");
        fs.copyFile(path.join(pathAssets, dir.name), path.join(pathProjectDist, "assets", dir.name), () => { });
      }
    });
  });
}

function copyStyles() {
  let content = "";
  fs.readdir(pathStyles, { withFileTypes: true }, (err, files) => {
    files.forEach(file => {
      if (file.isFile() && file.name.match(/.\w+$/i)[0].slice(1) === "css") {
        fs.readFile(path.join(pathStyles, file.name), 'utf8', (err, data) => {
          content += data;
          fs.writeFile(path.join(pathProjectDist, "style.css"), content, () => { });
        });
      }
    });
  });
}

function copyHTML() {
  fs.readFile(path.join(pathProjectDist, `template.html`), 'utf8', function () {
    fs.readdir(pathComponents, { withFileTypes: true }, (err, files) => {
      fs.copyFile(path.join(__dirname, `template.html`), path.join(pathProjectDist, `index.html`), async function () {

        let indexContent = await fs.readFile(path.join(pathProjectDist, `index.html`), 'utf8', () => { });
        console.log(indexContent);

        files.forEach(async (file) => {
          let fileName = file.name.match(/^\w+./i)[0].slice(0, -1);
          console.log(fileName);
        });

      });
    });
  });
}


