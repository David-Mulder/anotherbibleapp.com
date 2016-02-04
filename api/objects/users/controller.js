var User = require('./model.js');
var LoginToken = require('./../loginTokens/model.js');
var fetch = require('node-fetch');

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
    /*a = new User({
      displayName: 'David Mulder',
      email: 'test@test.com',
      password: 'hooooi'
    });
    a.save();
    User.find({}, function(err, users){
      console.log(users);
    });*/

    fetch('https://www.google.com/recaptcha/api/siteverify?secret=6LdkoBYTAAAAAEtRdNyfhuB_lHLLSda38z3Wfjmu&response='+req.body.captchaResponse).then(res => res.json()).then(result => {
      if(result.success){

        var user = new User({
          displayName: req.body.displayName,
          email: req.body.email,
          password: req.body.password
        });
        user.save(function(err, result){
          if(err){
            if(err.code === 11000){
              res.status(400).json({
                humanError: 'The email you entered is already registered'
              });
            }else{
              res.status(500).json({
                humanError: 'Something went wrong',
                err: err.errmsg
              });
            }
          }else{
            res.json(result);
          }
        });

      }else{
        res.status(400).json({
          humanError: 'Invalid recaptcha, please try reloading'
        });
      }
    });

    //res.send(req.body);
  }
};
