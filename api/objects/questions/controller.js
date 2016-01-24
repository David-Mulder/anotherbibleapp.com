var Question = require('./model');
var Answer = require('../answers/model');

module.exports = {
  get: function(req, res){
    var userId;
    if(req.user){
      userId = req.user._id;
    }
    Question
      .findOne({_id: req.params.id})
      .populate('user', 'displayName _id')
      .exec(function(err, question){
        if(err){
          res.status(500).json(err);
        }else{
          Answer.find({
            question: req.params.id
          }).populate('user', 'displayName _id').exec(function(err, answers){
            if(err){
              res.status(500).json(err);
            }else{
              res.json({
                question: question.makePublic(userId),
                answers: answers.map(a => a.makePublic(userId))
              });
            }
          });
        }
    });
  },
  create: function(req, res){
    var newQuestion = new Question({
      title: req.body.title,
      text: req.body.text,
      verses: req.body.verses,
      category: req.body.category,
      user: req.user._id
    });

    newQuestion.save(function(err, result){
      if(err){
        res.status(400).json(err);
      }else{
        res.json(result._id);
      }
    });
  },
  listForVerse: function(req, res){
    Question.find({
      verses: parseInt(req.params.verse)
    }).exec(function(err, result){
      if(err){
        res.status(500).json(err);
      }else{
        res.json(result.map(question => question.makePublic()));
      }
    });
  }
};
