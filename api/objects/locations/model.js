var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs'),
  SALT_WORK_FACTOR = 10;

var version = require('../../version.js');

var User = require('../users/model.js');

var schema = new Schema({
  coordinates: {
    type: [Number],
    index: '2dsphere'
  },
  title: String,
  description: String,
  wiki: String,
  polygon: {
    type: Array
  },
  timespan: {
    type: Object,
    default: {
      start: null,
      end: null
    }
  },
  verses: {
    type: [Number],
    required: true,
    index: true
  },
  revisionAuthor: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  precision: Number
});

schema.methods.makePublic = function(userId){
  var obj = this.toObject();
  return obj;
};

var Location;

schema.plugin(version, {
  get model(){
    return Location;
  },
  ignore: []
});

Location = mongoose.model('Location', schema);

module.exports = Location;
