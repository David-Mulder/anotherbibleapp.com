var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs'),
  SALT_WORK_FACTOR = 10;

var schema = new Schema({
  coordinates: {
    type: [Number],
    index: '2dsphere'
  },
  title: String,
  verses: {
    type: [Number],
    required: true,
    index: true
  }
});

schema.methods.makePublic = function(userId){
  var obj = this.toObject();
  return obj;
};

var Location = mongoose.model('Location', schema);

module.exports = Location;
