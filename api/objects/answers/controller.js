var Answer = require('./model');
var Question = require('../questions/model');

module.exports = {
  get: function(req, res){
    var userId;
    if(req.user){
      userId = req.user._id;
    }
    Answer
      .findOne({_id: req.params.id})
      .populate('originalAuthor', 'displayName _id')
      .populate('revisionAuthor', 'displayName _id')
      .exec(function(err, answer){
        if(err){
          res.status(500).json(err);
        }else{
          if(req.query.history) {
            console.log('or here2');

            answer.history().then(function(history){
              console.log('history', history);
              history = history.map(rev => rev.populate('originalAuthor', 'displayName _id').populate('revisionAuthor', 'displayName _id').execPopulate());
              Promise.all(history).then((revisions) => {
                var obj = answer.makePublic(userId);
                obj.revisions = revisions;
                res.json(obj);
              });
            });
          }else{
            console.log('here');
            res.json(answer.makePublic(userId));
          }
        }
      });
  },

  create: function(req, res){
    var answer = new Answer({
      text: req.body.text,
      originalAuthor: req.user._id,
      question: req.body.question
    });

    answer.save(function(err, answer){
      if(err){
        res.status(400).json(err);
      }else{

        var questionQuery = Question.findOne({
          _id: req.body.question
        });
        questionQuery.exec().then(function(question){
          question.numberOfAnswers = question.numberOfAnswers + 1;
          question.updatedAt = Date.now();
          question.save().then(function(){
            res.json(answer._id);
          });
        });

      }
    });
  },

  update: function(req, res){
    Answer
      .findOne({_id: req.params.id})
      .exec(function(err, answer){
        answer.text = req.body.text;
        answer.revisionAuthor = req.user._id;
        answer.save(function(err, answer){
          res.json(answer);
        });
      });
  },

  delete: function(req, res){

    Answer.findOne({
      _id: req.params.id
    })
      .populate('originalAuthor', 'displayName _id')
      .populate('revisionAuthor', 'displayName _id')
      .exec()
      .then(function(answer){
        if(answer.originalAuthor._id.equals(req.user._id) || req.user.admin){
          answer.deleted = !answer.deleted;
          answer.save().then(function(answer){

            var questionQuery = Question.findOne({
              _id: answer.question
            });
            questionQuery.exec().then(function(question){
              question.numberOfAnswers = question.numberOfAnswers - 1;
              question.updatedAt = Date.now();
              question.save().then(function(){
                res.json(answer.makePublic());
              });
            });

          });
        }
      });
  }

};
