var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  text: String,
  date: {
    type: Date
  },
  deleted: Boolean
});

var Comment = mongoose.model('Comment', schema);

module.exports = Comment;
