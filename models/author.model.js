const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AuthorSchema = new Schema({
  name: { type: String, required: true },
  bio: { type: String },
  books: [{type: Schema.Types.ObjectId, ref: 'Book' }]
});

module.exports = mongoose.model('Author', AuthorSchema);
