var authenticator = require('./objects/users/authenticator.js');
var questionController = require('./objects/questions/controller');

module.exports = {
  register: function(app){
    console.log('yeah');

    app.get('/authenticate/:email/:password', authenticator.authenticate);
    app.get('/questions/list/:verse', questionController.listForVerse);
    app.get('/question/:id', questionController.get);
    app.put('/question', authenticator.isAuthenticated, questionController.create);

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
