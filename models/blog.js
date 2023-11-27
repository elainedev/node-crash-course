const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  snippet: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, { timestamps: true});

// model named Blog 
// mongoose.model(modelName, schemaToBaseModelOn/typeOfObjectStoredInCollection)
const Blog = mongoose.model('Blog', blogSchema); // mongoose will pluralize Blog to Blogs and then look in the Blogs collection

// export the model
module.exports = Blog;