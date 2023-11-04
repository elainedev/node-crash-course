// youtube tutorial: https://www.youtube.com/watch?v=OIBIXYLJjsI&ab_channel=NetNinja

const {people, ages} = require('./people');
const os = require('os');

// console.log(os.platform(), os.homedir())

const fs = require('fs');

// reading files
fs.readFile('./blog.txt', (err, data) => {
  if (err) console.log(err);
  console.log(data, data.toString());
});

// writing files
fs.writeFile('./blog.txt', 'Text to write', () => {
  console.log('file was written')
})

// creates new file blog1.txt if it doesn't already exist
fs.writeFile('./blog1.txt', 'Text to write', () => {
  console.log('another file was written')
})

// directories
if (!fs.existsSync('./assets')) { 
  fs.mkdir('./assets', (err) => { // fs.mkdir(dir, async callback)
    if (err) { // err thrown if assets dir already exists
      console.log(err);
    }
    console.log('folder created')
  
  })
} 
else {
  fs.rmdir('./assets', (err) => {
    if (err) console.log(err);
    console.log('folder deleted')
  })
}

// deleting files
if (fs.existsSync('/blog1.txt')) {
  fs.unlink('./blog1.txt', (err) => {
    if (err) console.log(err);
    console.log('file deleted');
  });
}
