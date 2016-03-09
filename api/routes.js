var rateLimit = require('express-rate-limit');

var authenticator = require('./objects/users/authenticator');
var questionController = require('./objects/questions/controller');
var answerController = require('./objects/answers/controller');
var votingController = require('./objects/votes/controller');
var userController = require('./objects/users/controller');
var searchController = require('./objects/search/controller');
var commentController = require('./objects/comments/controller');

var strongLimit = rateLimit({
  delayAfter: 3,
  max: 30
});

var weakLimit = rateLimit({
  delayAfter: 30,
  max: 60
});

module.exports = {
  register: function(app){

    app.use(function(req, res, next){
      console.info(req.url);
      next();
    });

    app.get('/authenticate/:email/:password', strongLimit, authenticator.authenticate);

    app.get('/qa/:id', weakLimit, questionController.getWithAnswers);

    app.get('/user', authenticator.isAuthenticated, userController.get);
    app.put('/user', userController.register);
    app.get('/user/settings', authenticator.isAuthenticated, userController.getAllSettings);
    app.get('/user/settings/reset', authenticator.isAuthenticated, userController.resetSettings);
    app.get('/user/settings/:setting', authenticator.isAuthenticated, userController.getSetting);
    app.post('/user/settings/:setting', authenticator.isAuthenticated, userController.saveSetting);

    app.get('/question/:id', weakLimit, questionController.get);
    app.put('/question', authenticator.isAuthenticated, questionController.create);
    app.post('/question/:id', authenticator.isAuthenticated, questionController.update);
    app.get('/questions/list/recent', questionController.listRecent);
    app.get('/questions/list/:verse', questionController.listForVerse);

    app.get('/answer/:id', weakLimit, answerController.get);
    app.put('/answer', authenticator.isAuthenticated, answerController.create);
    app.post('/answer/:id', authenticator.isAuthenticated, answerController.update);

    app.put('/comment/:type/:id', authenticator.isAuthenticated, commentController.create);

    app.post('/upvote/:type/:id', authenticator.isAuthenticated, votingController.upvote);
    app.post('/downvote/:type/:id', authenticator.isAuthenticated, votingController.downvote);

    app.get('/synonyms/:word', searchController.synonyms);

    app.get('/', function (req, res) {
      res.send('Hello Worldd!');
    });

    /*

    app.get('/')*/


  }
};
