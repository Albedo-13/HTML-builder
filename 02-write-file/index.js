
const fs = require('fs');

let writeStream = fs.createWriteStream('02-write-file/text.txt', 'utf8');
let readStream = fs.createReadStream('02-write-file/text.txt', 'utf8');

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


// rl.question('input:', data => {
//   console.log(`You typed '${data.toString()}'`);
//   // writeStream.write(data.toString());

// });

//! TODO: ОБЬЕДИНИТЬ ДВЕ ЗАЛУПЫ В ОДНУ!

// process.stdin.on('readable', () => {
//   let chunk;
//   while ((chunk = process.stdin.read()) !== null) {
//    process.stdout.write(`data: ${chunk}`);
//   }
// });


// writeStream.end("Завершение записи");

// rl.question('What is your name ? ', function (name) {
//   rl.question('Where do you live ? ', function (country) {
//     console.log(`${name}, is a citizen of ${country}`);
//     rl.close();
//   });
// });

// fs.open('02-write-file/text.txt', 'r+', (err) => {
//   if(err) throw err;
//   console.log('File created');


// });

// fs.appendFile('02-write-file/text.txt', "my text", () => {
    
// });

// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('What is your name ? ', function (name) {
//   rl.question('Where do you live ? ', function (country) {
//     console.log(`${name}, is a citizen of ${country}`);
//     rl.close();
//   });
// });

// rl.on('close', function () {
//   console.log('\nBYE BYE !!!');
//   process.exit(0);
// });