const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    profile: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    savedBooks: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
    isAdmin: { type: Boolean, default: false },
  });
  
  module.exports = mongoose.model('User', UserSchema);