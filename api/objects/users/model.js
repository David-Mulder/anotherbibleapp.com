var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs'),
  SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  displayName: { type: String, required: true, maxlength: 25 },
  email: {type: String, required: true, unique: true, validate: {validator: val => /^\S+@\S+$/.test(val), message: 'Invalid email'}},
  password: {type: String, required: true},
  info: String,
  reputation: Number,
  settings: {type: Object, default: {}},
  recoveryToken: String,
  admin: Boolean
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.methods.makePublic = function(userId){
  var obj = this.toObject();
  delete obj.password;
  delete obj.recoveryToken;
  delete obj.settings;
  return obj;
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
