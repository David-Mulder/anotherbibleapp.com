var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  uuid = require('uuid');
var User = require('../users/model.js');

var schema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  upvotes: Array,
  downvotes: Array,
  verses: {
    type: Array,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

schema.methods.makePublic = function(userId){
  var obj = this.toObject();

  obj.upvoted = obj.upvotes.some(uID => uID.equals(userId));
  obj.downvoted = obj.downvotes.some(uID => uID.equals(userId));
  obj.upvotes = obj.upvotes.length;
  obj.downvotes = obj.downvotes.length;
  obj.score = obj.upvotes - obj.downvotes;

  delete obj.user.password; //unnecessary, but just in case
  return obj;
};

var Question = mongoose.model('questions', schema);

module.exports = Question;
