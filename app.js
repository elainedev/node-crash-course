// Net Ninja Node.js Crash Course Tutorial #6 - Express App
// file for Express app

const express = require('express');

// express app
const app = express();

// register view engine ejs
app.set('view engine', 'ejs');
// ejs automatically looks in `views` folder
// app.set('views', 'customViewsDirectory');



// listen for requests
app.listen(3000); // returns instance of the server, like http.createServer() in server.js


// app.get(urlToListenTo, fn)
app.get('/', (request, response) => {
  // response.send('<p>home page</p>'); 
  // send() infers the type of content we are trying to send to the browser & automatically sets the content type header, so no need to write `response.setHeader('Content-Type', 'text/html');`
  // send() also infers the status code (e.g. 200)

  // response.sendFile('./views/index.html', {root: __dirname});
  // response.send(absolutePath), or
  // response.send(relativePathRelativeToRoot, {root: __dirname})
  // __dirname is current directory

  response.render('index'); // looks at index.ejs file
});

app.get('/about', (request, response) => {
  // response.send('<p>about page</p>');
  // response.sendFile('./views/about.html', {root: __dirname});

  response.render('about');
});

// redirects '/about-us' to 'about'
// doesn't work/ course might be outdated
app.get('/about-us', (request, response) => {
  response.redirect('/about');
});

app.get('/blogs/create', (request, response) => {
  response.render('create');
})

// 404 page
// not necessary for 404 page to show if 404 file is named 404.html
app.use((request, response) => {
  // response.status(404).sendFile('./views/404file.html', {root: __dirname})
  response.status(404).render('404');
})