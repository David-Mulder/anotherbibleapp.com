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
    User.findOne({email: req.body.username}, function(err, user){
      if(user === null){
        res.status(401).json('invalid email');
      }else{
        user.comparePassword(req.body.password, function(err, okay){
          if(okay){
            lt = new LoginToken({
              userId: user.id
            });
            lt.save(function(err, lt){
              res.json({
                token:lt.token,
                user: user.makePublic()
              });
            });
          }else{
            res.status(401).json('invalid password');
          }
        });
      }
    });
  },
  handleAuthentication: function(req, res, next){
    var token = req.headers['auth-token'] || req.query.token;
    if(token){
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
          req.user = 'Invalid token';
          next();
          //res.status(401).json('Invalid token');
        }
      });
    }else{
      next();
    }
  },
  isAuthenticated: function (req, res, next){
    if(req.user === 'Invalid token'){
      res.status(401).json('Invalid token');
    }else{
      if(typeof req.user !== 'undefined'){
        next();
      }else{
        res.status(401).json('Invalid token');
      }
    }
  }
};
