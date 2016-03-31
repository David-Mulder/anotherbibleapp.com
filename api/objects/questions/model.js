var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  uuid = require('uuid');
var User = require('../users/model.js');
var version = require('../../version.js');
var Comment = require('../comments/model.js');

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
  score: {
    type: Number,
    default: 0
  },
  verses: {
    type: Array,
    required: true
  },
  originalAuthor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  revisionAuthor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  deleted: Boolean,
  numberOfAnswers: {
    type: Number,
    default: 0
  }
});

schema.methods.makePublic = function(userId){
  var obj = this.toObject();

  obj.upvoted = obj.upvotes.some(uID => uID.equals(userId));
  obj.downvoted = obj.downvotes.some(uID => uID.equals(userId));
  obj.upvotes = obj.upvotes.length;
  obj.downvotes = obj.downvotes.length;
  //obj.score = obj.upvotes - obj.downvotes;

  return obj;
};

var Question;

schema.plugin(version, {
  get model(){
    return Question;
  },
  ignore: ['upvotes', 'downvotes', 'comments', 'deleted', 'score', 'numberOfAnswers']
});

Question = mongoose.model('Question', schema);

module.exports = Question;
