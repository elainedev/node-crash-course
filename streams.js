const fs = require('fs');

const readStream = fs.createReadStream('./blog3.txt');

readStream.on('data', (chunk) => {  // on 'data' event (i.e. when we get a chunk of data we can use from the stream), fire the callback fn with access to that chunk of data
  console.log('----NEW CHUNK------');
  console.log(chunk); // logs a Buffer <Buffer 2c 20...>
  console.log(chunk.toString()); // returns chunk in string format
  // ^ alteratively, pass { encoding: 'utf8'} as param to readStream below
})

const readEncodedStream = fs.createReadStream('./blog3.txt', { encoding: 'utf8'});
const writeStream = fs.createWriteStream('./blog4.txt');

readEncodedStream.on('data', (chunk) => {  // on 'data' event (i.e. when we get a chunk of data we can use from the stream), fire the callback fn with access to that chunk of data
  console.log('----NEW CHUNK------');
  console.log(chunk); // logs chunk in string format since encoing is passed in

  // writes chunk to another file
  writeStream.write('\nNEW CHUNK\n');
  writeStream.write(chunk);
})

// can use pipes as an alternative way to achieve above functionality of passing data from a readable to a writable stream
// pipes must be from a readable stream to a writable one

// piping
readEncodedStream.pipe(writeStream); // does the same thing as lines 15-22
