const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookRatingSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: false },
  rating: { type: Number, min: 1, max: 5, required: true },
  review: { type: String, required: false },
},{ strictPopulate: false });

module.exports = mongoose.model('BookRating', BookRatingSchema);
