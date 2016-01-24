var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  uuid = require('uuid');

var schema = new Schema({
  userId: Schema.Types.ObjectId,
  expire: Date,
  token: String
});

schema.pre('save', function(next) {
  if(typeof this.token === 'undefined'){
    this.token = uuid.v4();
  }
  if(typeof this.expire === 'undefined'){
    this.expire = new Date(Date.now()+1000*60*60*24*7);
  }
  next();
});

var LoginToken = mongoose.model('loginTokens', schema);

module.exports = LoginToken;
