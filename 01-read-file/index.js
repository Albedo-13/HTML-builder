const fs = require('fs');
let fileStream = fs.createReadStream('01-read-file/text.txt', 'utf8');

fileStream.on("data", function(chunk) {
  console.log(chunk);
});

// const Emitter = require('events');
// let emitter = new Emitter();

// let eventName = 'greet';

// emitter.on(eventName, function (data) {
//   console.log(data);
// });

// emitter.on(eventName, function () {
//   console.log('Привет!');
// });

// emitter.emit(eventName, "HELLO CRUEL WORLD!");