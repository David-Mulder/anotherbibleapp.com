var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  uuid = require('uuid');

var confidence = require('../../utils/confidence');

var User = require('../users/model.js');
var Question = require('../questions/model.js');
var Comment = require('../comments/model.js');
var version = require('../../version.js');

var schema = new Schema({
  text: {
    type: String,
    required: true
  },
  upvotes: Array,
  downvotes: Array,
  score: {
    type: Number,
    default: 0
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
  question: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Question'
  },
  deleted: Boolean,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  source: Object,
  smartScore: {
    type: Number,
    default: 0
  }
});

schema.pre('save', function(next) {
  if(this.isModified('upvotes') || this.isModified('downvotes')){
    this.smartScore = confidence(this.upvotes.length, this.downvotes.length);
    this.score = this.upvotes.length - this.downvotes.length;
  }
  next();
});

//schema.plugin(version);

schema.methods.makePublic = function(userId){
  //console.log('make answer public', userId);
  //console.log(this);
  var obj = this.toObject();

  obj.upvoted = obj.upvotes.some(uID => uID.equals ? uID.equals(userId) : false);
  obj.downvoted = obj.downvotes.some(uID => uID.equals ? uID.equals(userId) : false);
  obj.upvotes = obj.upvotes.length;
  obj.downvotes = obj.downvotes.length;
  //obj.score = obj.upvotes - obj.downvotes;

  delete obj.originalAuthor.password; //unnecessary, but just in case
  return obj;
};

var Answer;

schema.plugin(version, {
  get model(){
    return Answer;
  },
  ignore: ['upvotes', 'downvotes', 'comments', 'deleted', 'score']
});

Answer = mongoose.model('answers', schema);

module.exports = Answer;
