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
  authenticate: function(req, res){
    User.findOne({email: req.params.email}, function(err, user){
      if(user === null){
        res.status(401).json('Invalid email');
      }else{
        user.comparePassword(req.params.password, function(err, okay){
          if(okay){
            lt = new LoginToken({
              userId: user.id
            });
            lt.save(function(err, lt){
              res.json(lt.token);
            });
          }else{
            res.status(401).json('Invalid password');
          }
        });
      }
    });
  },
  isAuthenticated: function (req, res, next){
    var token = req.headers['auth-token'] || req.query.token;
    LoginToken.findOne({
      token: token
    }, function(err, token){
      //todo: expire logic
      if(token){
        User.findOne({
          _id: token.userId
        }, function(err, user){
          req.user = user;
          next();
        });
      }else{
        res.status(401).json('Invalid token');
      }
    });
    return;
    if(false && validated){
      next();
    }else{
      res.send('login');
    }
  }
};
