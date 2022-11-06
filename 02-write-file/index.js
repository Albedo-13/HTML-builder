const fs = require('fs');

let writeStream = fs.createWriteStream('02-write-file/text.txt', 'utf8');
console.log("Файл открыт для записи");

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

process.stdin.on('data', data => {
  writeStream.write(data.toString());
});

rl.on('line', (line) => {
  if (line.match(/^exit$/i)) {
    console.log("Произведена запись в файл. Завершаем работу");
    process.exit();
  }
});

rl.on('SIGINT', () => {
  console.log("Произведена запись в файл. Завершаем работу");
  process.exit();
});