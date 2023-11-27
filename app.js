// Net Ninja Node.js Crash Course Tutorial #6 - Express App
// file for Express app

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongodb w username fatninja & pw fatninja0
const dbURI = 'mongodb+srv://fatninja:fatninja0@nodetuts.ovcqjhc.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
  .then(result => console.log('connected to db'))
  .catch(err => console.log('fuck this shit', error))

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

{/* mongoose and mongo sandbox routes to test interactions with the db
// app.get('/add-blog', (request, response) => {
//   const blog = new Blog({
//     title: "Fuckity Fuck 4",
//     snippet: "About the new blog",
//     body: 'more fuckery'
//   });

//   // save(): model's method to save to the db
//   blog.save()
//     .then(result => {
//       response.send(result) // send back result so we can see it in the browser
//     })
//     .catch(error => console.log(error))
// })

// app.get('/all-blogs', (request, response) => {
//   Blog.find()  // gets all the documents in the Blogs collection
//     .then(result => response.send(result))
//     .catch(error => console.log(error))
// })

// app.get('/single-blog', (request, response) => {
//   Blog.findById('6561ba2f2ed9caac1e249d27')
//     .then(result => response.send(result))
//     .catch(error => console.log(error));
// })
*/}

// app.use((request, response, next) => {
//   console.log('new request made:');
//   console.log('host: ', request.hostname);
//   console.log('path: ', request.path);
//   console.log('method: ', request.method);
//   next(); // proceeds to the next fn; o/w the middleware would hang
// })

// app.use((request, response, next) => {
//   console.log('in the next middleware');
//   next(); // proceeds to the next fn; o/w the middleware would hang
// })

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

app.get('/blogs', (request, response) => {
  Blog.find().sort( { createdAt: -1}) // find all the documents inside the Blog collection, sorted by descending order (newest to oldest)
    .then(result => {
      response.render('index', { title: 'All Blogs', blogs: result})
    })
    .catch(error => console.log(error))
})

app.post('/blogs', (request, response) => {
  const blog = new Blog(request.body);

  blog.save()
    .then(result => {
      response.redirect('/blogs');
    })
    .catch(error => console.log(error))
})

app.get('/blogs/:id', (request, response) => {
  const id = request.params.id; // gets the id from `/blogs/:id'
  Blog.findById(id)
    .then(result => {
      response.render('details',  {blog: result, title: 'Blog Details'})
    })
    .catch(error => console.log(error))
})

app.delete('/blogs/:id', (request, response) => {
  const id = request.params.id;
  Blog.findByIdAndDelete(id) // finds document by id and deletes it from db
    .then(result => {
      // when receiving an AJAX request (from details.ejs), the Node app.js here is unable to respond with a redirect. Instead, we send JSON to browser with a redirect property containing the url to redirect to
        response.json({ redirect: '/blogs' });

    })
    .catch(error => console.log(error))
})

// redirects '/about-us' to 'about'
// doesn't work; course might be outdated
app.get('/about-us', (request, response) => {
  response.redirect('/about');
});

app.get('/blogs/create', (request, response) => {
  response.render('create', { title: 'Create an Entry' });
})

// 404 page
// not necessary for 404 page to show if 404 file is already named 404.html
app.use((request, response) => {
  // response.status(404).sendFile('./views/404file.html', {root: __dirname})
  response.status(404).render('404', {title: '404'});
})