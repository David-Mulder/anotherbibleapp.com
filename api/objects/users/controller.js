var User = require('./model.js');
var LoginToken = require('./../loginTokens/model.js');
var fetch = require('node-fetch');
var uuid = require('uuid');
var nodemailer = require('nodemailer');
var Question = require('../questions/model');
var Answer = require('../answers/model');

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

var deletionCheck = function(req, selector){
  if(req.user && req.user.admin){
    return selector;
  }else{
    selector.deleted = {$ne: true};
    return selector;
  }
};

module.exports = {
  get: function(req, res){
    var userPromise = User.findOne({_id: req.params.id}).exec();
    var questionPromise = Question.find(deletionCheck(req, {originalAuthor: req.params.id})).sort('-createdAt').limit(10).exec();
    var answerPromise = Answer.find(deletionCheck(req, {originalAuthor: req.params.id})).sort('-createdAt').limit(10).populate('question', 'title verses deleted').exec();
    Promise.all([userPromise, questionPromise, answerPromise]).then(function(results){
      //[user, questions] = results;
      var user = results[0];
      var questions = results[1];
      var answers = results[2];

      answers = answers.filter(answer => !answer.question.deleted);
      questions = questions.map(question => question.makePublic());
      answers = answers.map(question => question.makePublic());
      questions.forEach(question => question.type = 'question');
      answers.forEach(question => question.type = 'answer');
      var activity = questions.concat(answers);
      activity.sort((a, b) => b.createdAt - a.createdAt);
      //console.log(questions.map(q => q.updatedAt));

      activity = activity.splice(0, 10);

      var result = {
        user: user.makePublic(),
        me: req.user && user._id.equals(req.user._id),
        activity: activity
      };

      res.json(result);
    });
  },
  updateCurrentlyLoggedInUser: function(req, res){
    req.user.info = req.body.user.info;
    req.user.save().then(function(user){
      res.json(user.makePublic());
    });
  },
  getCurrentlyLoggedInUser: function(req, res){
    res.json(req.user.makePublic());
  },
  recovery: function(req, res){
    User.findOne({email: req.body.username}, function(err, user) {
      if (user === null) {
        res.status(401).json('invalid email');
      } else {
        user.recoveryToken = uuid.v4();
        user.save().then(function(user){
          var transporter = nodemailer.createTransport('direct:?name=anotherbibleapp.com');
          var mailOptions = {
            from: '"Another Bible App" <no-reply@anotherbibleapp.com>', // sender address
            to: user.email, // list of receivers
            subject: 'Password Recovery for Another Bible App', // Subject line
            text: 'Open the following link to reset your password: https://anotherbibleapp.com/forgot-my-password/'+user.recoveryToken,
            html: '<p>Open <a href="https://anotherbibleapp.com/forgot-my-password/'+user.recoveryToken+'">this link</a> to reset your password.</p>' // html body
          };
          transporter.sendMail(mailOptions, function(error, info){
            if(error){
              res.status(500).json({
                humanError: 'Something went wrong...',
                error: error
              });
            }else{
              res.json('success');
              //console.log('Message sent: ' + info.response);
            }
          });
        });

        //user.save().then(function(user){
        //  res.json(user.makePublic()); //makepublic
        //});
      }
    });
  },
  resetPassword: function(req, res){
    User.findOne({recoveryToken: req.body.resetToken}).exec().then(function(user){
      if(user.recoveryToken.length > 0){
        user.password = req.body.password;
        user.recoveryToken = '';
        user.save().then(function(user){
          res.json(user.makePublic());
        }).catch(function(err){
          res.status(500).json(err);
        });
      }
    });
  },
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
                err: err
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
  },
  getAllSettings: function(req, res){
    User.findOne({ _id: req.user._id}).exec().then(function(user){
      res.json(user.settings);
    });
  },
  resetSettings: function(req, res){
    User.findOne({ _id: req.user._id}).exec().then(function(user){
      user.settings = {};
      user.save().then(function(){
        res.json('true');
      }).catch(function(err){
        res.json(err);
      });
    });
  },
  getSetting: function(req, res){
    User.findOne({ _id: req.user._id}).select('settings').exec().then(function(user){
      if(req.params.setting in user.settings){
        res.json(user.settings[req.params.setting]);
      }else{
        res.json({
          value: null,
          updatedAt: new Date(0)
        });
      }

    });
  },
  saveSetting: function(req, res){
    if(/^[a-zA-Z\-0-9]+$/.test(req.params.setting)){
      var update = {};

      update['settings.'+req.params.setting] = {
        value: req.body.value,
        updatedAt: new Date(req.body.updatedAt) || new Date()
      };
      User.where({ _id: req.user._id}).update(update).then(function(result){
        res.json(result.ok);
      });
    }
  }
};
