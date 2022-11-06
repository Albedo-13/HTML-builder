const fs = require('fs');
let fileStream = fs.createReadStream('01-read-file/text.txt', 'utf8');

fileStream.on("data", function(chunk) {
  console.log(chunk);
});