var Token = require('./model');

module.exports = {
  cleanup: function(req, res){
    Token.remove({
      expire: {
        $lt: new Date()
      }
    }).exec().then(function(tokens){
      res.json(tokens);
    });
  }
};
