// Net Ninja Node.js Crash Course Tutorial #6 - Express App
// file for Express app

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb w username fatninja & pw fatninja0
const dbURI = 'mongodb+srv://fatninja:fatninja0@nodetuts.ovcqjhc.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
  .then(result => console.log('connected to db'))
  .catch(err => console.log('mongoose error', err))

// register view engine ejs
app.set('view engine', 'ejs');
// ejs automatically looks in `views` folder
// app.set('views', 'customViewsDirectory');

// listen for requests
app.listen(3000); // returns instance of the server, like http.createServer() in server.js

// middleware & static files
app.use(express.static('public')); // 'public' is folder name; anything in 'public' is available as a static file to the frontend
app.use(express.urlencoded({extended: true}));// takes urlencoded data and passes it to an object we can use on the request object in app.post
app.use(morgan('dev')); // morgan logs info to the console

// ***************** ROUTES *****************
// app.get(urlToListenTo, fn)
app.get('/', (request, response) => {
  // response.send('<p>home page</p>'); 
  // send() infers the type of content we are trying to send to the browser & automatically sets the content type header, so no need to write `response.setHeader('Content-Type', 'text/html');`
  // send() also infers the status code (e.g. 200)

  // response.sendFile('./views/index.html', {root: __dirname});
  // response.send(absolutePath), or
  // response.send(relativePathRelativeToRoot, {root: __dirname})
  // __dirname is current directory

  // const blogs = [
  //   {title: 'Yoshi finds eggs', snippet: 'They are speckled green.'},
  //   {title: 'Mario finds stars', snippet: 'Again for the 50th time.'},
  //   {title: 'How to defeat Bowser', snippet: 'Grab him by the tail.'}
  // ]

  // response.render('index', { title: 'Home', blogs }); // looks at index.ejs file; 2nd arg is an object that will be passed to index.ejs as data

  response.redirect('/blogs');
});

app.get('/about', (request, response) => {
  // response.send('<p>about page</p>');
  // response.sendFile('./views/about.html', {root: __dirname});

  response.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes); // automatically applies "blogs" to the url path and only use the blogRoutes when the path starts with "blogs", so create url will look like localhost:3000/blogs/create

// 404 page
// not necessary for 404 page to show if 404 file is already named 404.html
app.use((request, response) => {
  // response.status(404).sendFile('./views/404file.html', {root: __dirname})
  response.status(404).render('404', {title: '404'});
})