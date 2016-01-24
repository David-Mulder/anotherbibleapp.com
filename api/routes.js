var authenticator = require('./objects/users/authenticator');
var questionController = require('./objects/questions/controller');
var answerController = require('./objects/answers/controller');
var votingController = require('./objects/votes/controller');

module.exports = {
  register: function(app){
    console.log('yeah');

    app.get('/authenticate/:email/:password', authenticator.authenticate);
    app.get('/questions/list/:verse', questionController.listForVerse);
    app.get('/question/:id', questionController.get);
    app.put('/question', authenticator.isAuthenticated, questionController.create);
    app.put('/answer', authenticator.isAuthenticated, answerController.create);
    app.post('/upvote/:type/:id', authenticator.isAuthenticated, votingController.upvote);
    app.post('/downvote/:type/:id', authenticator.isAuthenticated, votingController.downvote);

    app.get('/', function (req, res) {
      res.send('Hello Worldd!');
    });

    /*

    app.get('/')*/

    app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
    });

  }
};
