var authenticator = require('./objects/users/authenticator');
var questionController = require('./objects/questions/controller');
var answerController = require('./objects/answers/controller');
var votingController = require('./objects/votes/controller');
var userController = require('./objects/users/controller');

module.exports = {
  register: function(app){

    app.use(function(req, res, next){
      console.info(req.url);
      next();
    });

    app.get('/authenticate/:email/:password', authenticator.authenticate);

    app.get('/qa/:id', questionController.getWithAnswers);

    app.get('/question/:id', questionController.get);
    app.put('/question', authenticator.isAuthenticated, questionController.create);
    app.post('/question/:id', authenticator.isAuthenticated, questionController.update);
    app.get('/questions/list/recent', questionController.listRecent);
    app.get('/questions/list/:verse', questionController.listForVerse);

    app.put('/user', userController.register);

    app.get('/answer/:id', answerController.get);
    app.put('/answer', authenticator.isAuthenticated, answerController.create);
    app.post('/answer/:id', authenticator.isAuthenticated, answerController.update);

    app.post('/upvote/:type/:id', authenticator.isAuthenticated, votingController.upvote);
    app.post('/downvote/:type/:id', authenticator.isAuthenticated, votingController.downvote);

    app.get('/', function (req, res) {
      res.send('Hello Worldd!');
    });

    /*

    app.get('/')*/


  }
};
