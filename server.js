// Node app without using Express
// see app.js for usage of Express
const http = require('http');
const fs = require('fs');
const _ = require('lodash');


// callback fn param runs everytime a request comes in
const server = http.createServer((request, response) => {

  // lodash
  const num = _.random(0, 20); // generates random number b/n 0 and 20

  const greet = _.once(() => {
    console.log('hello')
  })

  greet(); // executes
  greet(); // does not execute b/c lodash specified once() in line 12

  // set header content type for the response to the browser
  response.setHeader('Content-Type', 'text/html');

  let path = './views/';

  switch(request.url) {
    case '/':
      path += 'index.html';
      response.statusCode = 200; // set the appropriate status code to the http response
      break;
    case '/about':
      path += 'about.html';
      response.statusCode = 200;
      break;
    case '/about-mes': // redirect to 'about'
      
      response.statusCode = 301; // change status code to 301: i.e.resource permanently moved
      response.setHeader('Location', '/about') // redirect to '/about'
      response.end();
      break;
    default:
      path += '404.html';
      response.statusCode = 404;
      break;
  }

  // lines 12-33 can be handled by Express

  {/* tutorial #4.2 writing small html chunks
  //// response.setHeader('Content-Type', 'text/plain');
  //// write content to be sent back to the browser
  response.write('<p>hello, ninjas</p>');
  response.write('<p>hello again, ninjas</p>');

  // end the response
  response.end();
  */}

  // tutorial #4.3: Returning HTML Pages
  // send an html file
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      response.end(); // end the response; o/w error would just hang
    }
    else {
      // add status code to response
      response.end(data); // same as writing the 2 lines `response.write(data); response.end();`
    }
  })



});

// invoke listen method 
// listen([portNumber], 'localhost'(default value), fn that fires when start listening)
server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
}) 