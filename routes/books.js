const router = require('express').Router();
let Book = require('../models/book.model');

router.route('/').get((req, res)  => {
    Book.find()
    .populate('rating') // Assuming there is a 'ratings' field in the Book schema that references the 'BookRating' schema
    .exec()
    .then(books => { console.log(books); res.json(books); })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {

    const title = req.body.title;
    const author = req.body.author;
    const description = req.body.description;
    const category = req.body.category;
    const coverImage = req.body.coverImage;


    const newBook = new Book({
        title, author, description, category, coverImage
    });

    newBook.save()
    .then(result => {
      res.status(201).json({
        message: 'Book created successfully',
        book: result
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
})

    router.route('/:id').get((req, res) => {
        Book.findById(req.params.id).then(books => res.json(books)).catch(err => res.status(400).json('Error: ' + err));
    });

    router.route('/:id').delete((req, res) => {
        Book.findByIdAndDelete(req.params.id).then(() => res.json('Book deleted.')).catch(err => res.status(400).json('Error: ' + err));
    });
    
    router.route('/update/:id').post((req, res) => {
        Book.findById(req.body.id).then(books => {
            books.title = req.body.title;
            books.author = req.body.author;
            books.description = req.body.description;
            books.category = req.body.category;
            books.coverImage = req.body.coverImage;

            books.save().then(() => res.json('Book updated!')).catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    });
module.exports = router;