
const router = require('express').Router();
let BookRating = require('../models/book-rating.model');
const { ObjectId } = require('mongoose').Types;

// POST request to add a new book rating for a specific book
router.route('/:id/rating').post((req, res) => {
  const { rating, review } = req.body;

  const bookRating = new BookRating({ rating, review });

  bookRating.save()
    .then(() => res.json('Rating added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET request to get all book ratings
router.route('/').get((req, res) => {
  BookRating.find()
    .populate('book')
    .then(bookRatings =>  res.json(bookRatings))    
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET request to get a specific book rating by ID
router.route('/:id').get((req, res) => {
  BookRating.findById(req.params.id).then(bookRating => res.json(bookRating)).catch(err => res.status(400).json('Error: ' + err));
});

// DELETE request to delete a specific book rating by ID
router.route('/:id').delete((req, res) => {
  const bookRatingId = ObjectId(req.params.id);

  BookRating.findByIdAndDelete(bookRatingId)
    .then(() => res.json('Book rating deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// POST request to update a specific book rating by ID
router.route('/:id').post((req, res) => {
  const bookRatingId = ObjectId(req.params.id);

  BookRating.findByIdAndUpdate(bookRatingId, {
    rating: req.body.rating,
    review: req.body.review,
  })
    .then(() => res.json('Book rating updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
