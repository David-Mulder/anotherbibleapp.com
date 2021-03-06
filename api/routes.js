var rateLimit = require('express-rate-limit');

var authenticator = require('./objects/users/authenticator');
var questionController = require('./objects/questions/controller');
var importController = require('./objects/questions/importController');
var answerController = require('./objects/answers/controller');
var votingController = require('./objects/votes/controller');
var userController = require('./objects/users/controller');
var searchController = require('./objects/search/controller');
var commentController = require('./objects/comments/controller');
var locationController = require('./objects/locations/controller');
var tokenController = require('./objects/loginTokens/controller');

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

    app.post('/authenticate', strongLimit, authenticator.authenticate);

    app.get('/qa/:id', weakLimit, questionController.getWithAnswers);

    app.get('/user', authenticator.isAuthenticated, userController.getCurrentlyLoggedInUser);
    app.put('/user', userController.register);
    app.post('/user', authenticator.isAuthenticated, userController.updateCurrentlyLoggedInUser);
    app.get('/user/settings', authenticator.isAuthenticated, userController.getAllSettings);
    app.get('/user/settings/reset', authenticator.isAuthenticated, userController.resetSettings);
    app.get('/user/settings/:setting', authenticator.isAuthenticated, userController.getSetting);
    app.post('/user/settings/:setting', authenticator.isAuthenticated, userController.saveSetting);
    app.post('/user/recovery', strongLimit, userController.recovery);
    app.post('/user/reset-password', strongLimit, userController.resetPassword);
    app.get('/user/:id', userController.get);

    app.get('/question/:id', weakLimit, questionController.get);
    app.delete('/question/:id', authenticator.isAuthenticated, questionController.delete);
    app.put('/question', authenticator.isAuthenticated, questionController.create);
    app.post('/question/:id', authenticator.isAuthenticated, questionController.update);
    app.get('/questions/list/recent', questionController.listRecent);
    app.get('/questions/list/top-unanswered', questionController.listTopUnanswered);
    app.get('/questions/list/recently-active', questionController.listRecentlyActive);
    app.get('/questions/list/:verse', questionController.listForVerse);

    app.get('/answer/:id', weakLimit, answerController.get);
    app.put('/answer', authenticator.isAuthenticated, answerController.create);
    app.post('/answer/:id', authenticator.isAuthenticated, answerController.update);
    app.delete('/answer/:id', authenticator.isAuthenticated, answerController.delete);

    app.put('/comment/:type/:id', authenticator.isAuthenticated, commentController.create);
    app.delete('/comment/:id', authenticator.isAuthenticated, commentController.delete);

    app.post('/upvote/:type/:id', authenticator.isAuthenticated, votingController.upvote);
    app.post('/downvote/:type/:id', authenticator.isAuthenticated, votingController.downvote);

    app.get('/synonyms/:word', searchController.synonyms);

    app.get('/location/:id', weakLimit, locationController.get);
    app.post('/location/:id', authenticator.isAuthenticated, weakLimit, locationController.update);
    app.get('/locations/list/viewport', weakLimit, locationController.listForViewport);
    app.get('/locations/list/coordinates', weakLimit, locationController.listForCoordinates);
    app.get('/locations/list/:verse', weakLimit, locationController.listForVerse);

    app.get('/token-cleanup', authenticator.isAdmin, tokenController.cleanup);

    app.get('/import/stackexchange/:id', authenticator.isAdmin, importController.christianityStackExchange);


    app.get('/', function (req, res) {
      res.send('Hello Worldd!');
    });

    /*

    app.get('/')*/


  }
};
