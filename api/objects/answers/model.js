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

schema.methods.makePublic = function(){
  var obj = this.toObject();
  obj.upvotes = obj.upvotes.length;
  obj.downvotes = obj.downvotes.length;
  delete obj.user.password; //unnecessary, but just in case
  return obj;
};

var Answer = mongoose.model('answers', schema);

module.exports = Answer;
