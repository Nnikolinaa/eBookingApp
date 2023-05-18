const router = require('express').Router();
let Author = require('../models/author.model');
const Book = require('../models/book.model');

router.get('/:name', async (req, res) => {
  try {
    const authorName = decodeURIComponent(req.params.name.replace(/_/g, ' '));

    const author = await Author.findOne({ name: authorName }).populate('books', 'title').select('name bio');
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route('/').get(async (req, res) => {
    try {
      const authors = await Author.find().populate('books', 'title');
      res.json(authors);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.route('/add').post(async (req, res) => {
    try {
      const authorName = req.body.name;
      const authorBio = req.body.bio;
      // Find all books by the author
      const authorBooks = await Book.find({ author: authorName }).select('title');
  
      // Extract the titles of the books
      const bookTitles = authorBooks.map(book => book.title);

      const newAuthor = new Author({
        name: authorName,
        bio: authorBio,
        books: bookTitles,
      });
  
      const savedAuthor = await newAuthor.save();
  
      res.status(201).json({
        message: 'Author created successfully',
        author: savedAuthor,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
