const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;

stdout.write('Файл открыт для записи\n');
stdin.on('data', data => writeTo(data));
process.on('exit', () => stdout.write('Запись в файл завершена.'));

function writeTo (data) {
    const buffer = Buffer.from(data, 'utf8');
    if (buffer.toString().trim() == 'exit') {
        process.exit();
    }
    
    fs.appendFile(path.join(__dirname, 'text.txt'), data, () => { });
}