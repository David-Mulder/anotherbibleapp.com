var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  uuid = require('uuid');

var confidence = require('../../utils/confidence');

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
  deleted: {
    type: Boolean,
    default: false
  },
  numberOfAnswers: {
    type: Number,
    default: 0
  },
  source: {
    type: Object
  },
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

schema.methods.makePublic = function(userId){
  var obj = this.toObject();

  obj.upvoted = obj.upvotes.some(uID => uID.equals ? uID.equals(userId) : false);
  obj.downvoted = obj.downvotes.some(uID => uID.equals ? uID.equals(userId) : false);
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
  ignore: ['upvotes', 'downvotes', 'comments', 'deleted', 'score', 'numberOfAnswers', 'smartScore']
});

Question = mongoose.model('Question', schema);

module.exports = Question;
