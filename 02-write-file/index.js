const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;

fs.open('02-write-file/text.txt', 'w', () => { });
stdout.write('Файл открыт для записи\n');

stdin.on('data', data => writeTo(data));
process.on('exit', () => stdout.write('Запись в файл завершена.'));

process.on('SIGINT', () => {
  process.exit();
});

function writeTo (data) {
    const buffer = Buffer.from(data, 'utf8');
    if (buffer.toString().trim() == 'exit') {
        process.exit();
    }
    
    fs.appendFile(path.join(__dirname, 'text.txt'), data, () => { });
}