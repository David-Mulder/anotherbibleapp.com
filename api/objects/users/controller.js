var User = require('./model.js');
var LoginToken = require('./../loginTokens/model.js');
/*

 a = new User({
 displayName:'test',
 email:'test@test.cm',
 password:'hai'
 });
 a.save();
 User.find({}, function(err, users){
 console.log(users);
 });
 */

module.exports = {
  register: function(req, res) {
    a = new User({
      displayName: 'David Mulder',
      email: 'test@test.com',
      password: 'hooooi'
    });
    a.save();
    User.find({}, function(err, users){
      console.log(users);
    });
  }
};
