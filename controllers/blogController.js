const Blog = require('../models/blog');

const blog_index = (request, response) => {
  Blog.find().sort({ createdAt: -1}) // find all the documents inside the Blog collection, sorted by descending order (newest to oldest)
    .then(result => {
      response.render('index', { title: 'All Blogs', blogs: result})
    })
    .catch(error => console.log(error))
}

const blog_details = (request, response) => {
  const id = request.params.id; // gets the id from `/blogs/:id'
  Blog.findById(id)
    .then(result => {
      response.render('details',  {blog: result, title: 'Blog Details'})
    })
    .catch(error => response.status(404).render('404', {title: 'Blog not found'}))
}

const blog_create_get = (request, response) => {
  response.render('create', { title: 'Create an Entry' });
}

const blog_create_post = (request, response) => {
  const blog = new Blog(request.body);

  blog.save()
    .then(result => { 
      response.redirect('/');
    })
    .catch(error => console.log(error))
}

const blog_delete = (request, response) => {
  const id = request.params.id;
  Blog.findByIdAndDelete(id) // finds document by id and deletes it from db
    .then(result => {
      // when receiving an AJAX request (from details.ejs), the Node router.js here is unable to respond with a redirect. Instead, we send JSON to browser with a redirect property containing the url to redirect to
        response.json({ redirect: '/blogs' });

    })
    .catch(error => console.log(error))
}


module.exports = {
  blog_index, 
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete
}