const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true},
  coverImage: { type: String, required: true },
  rating: [{ type: Schema.Types.ObjectId, ref: 'BookRating'}],
  savedBook: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Book', BookSchema);
