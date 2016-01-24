var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  uuid = require('uuid');
var User = require('../users/model.js');
var Question = require('../questions/model.js');

var schema = new Schema({
  text: {
    type: String,
    required: true
  },
  upvotes: Array,
  downvotes: Array,
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  question: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Question'
  }
});

schema.methods.makePublic = function(userId){
  console.log('make answer public', userId);
  var obj = this.toObject();

  obj.upvoted = obj.upvotes.some(uID => uID.equals(userId));
  obj.downvoted = obj.downvotes.some(uID => uID.equals(userId));
  obj.upvotes = obj.upvotes.length;
  obj.downvotes = obj.downvotes.length;
  obj.score = obj.upvotes - obj.downvotes;

  delete obj.user.password; //unnecessary, but just in case
  return obj;
};

var Answer = mongoose.model('answers', schema);

module.exports = Answer;
