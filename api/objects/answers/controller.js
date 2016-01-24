var Answer = require('./model');

module.exports = {
  create: function(req, res){
    var answer = new Answer({
      text: req.body.text,
      user: req.user._id,
      question: req.body.question
    });

    answer.save(function(err, result){
      if(err){
        res.status(400).json(err);
      }else{
        res.json(result._id);
      }
    });
  }
};
