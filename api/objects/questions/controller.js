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
      .populate('originalAuthor', 'displayName _id')
      .populate('revisionAuthor', 'displayName _id')
      .exec(function(err, question){
        if(err){
          res.status(500).json(err);
        }else{
          if(req.query.history) {
            console.log('or here1');

            question.history().then(function(history){
              console.log('history', history);
              history = history.map(rev => rev.populate('originalAuthor', 'displayName _id').populate('revisionAuthor', 'displayName _id').execPopulate());
              Promise.all(history).then((revisions) => {
                var obj = question.makePublic(userId);
                obj.revisions = revisions;
                res.json(obj);
              });
            });
          }else{
            console.log('here');
            res.json(question.makePublic(userId));
          }
        }
      });
  },

  getWithAnswers: function(req, res){
    var userId;
    if(req.user){
      userId = req.user._id;
    }
    Question
      .findOne({_id: req.params.id})
      .populate('originalAuthor', 'displayName _id')
      .populate('revisionAuthor', 'displayName _id')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          select: 'displayName _id'
        }
      })
      .exec(function(err, question){
        if(err){
          res.status(500).json(err);
        }else{
          Answer
            .find({
              question: req.params.id
            })
            .populate('originalAuthor', 'displayName _id')
            .populate('revisionAuthor', 'displayName _id')
            .populate({
              path: 'comments',
              populate: {
                path: 'user',
                select: 'displayName _id'
              }
            })
            .exec(function(err, answers){
              if(err){
                res.status(500).json(err);
              }else{
                var answers = answers.map(a => a.makePublic(userId));
                  answers.sort(function(a, b){
                  return b.score - a.score;
                });
                res.json({
                  question: question.makePublic(userId),
                  answers: answers
                });
              }
            });
        }
    });
  },

  update: function(req, res){
    console.info('update question triggered');
    Question
      .findOne({_id: req.params.id})
      .exec(function(err, question){
        question.text = req.body.text;
        question.title = req.body.title;
        question.verses = req.body.verses;
        question.revisionAuthor = req.user._id;
        question.save(function(err, question){
          if(err){
            res.status(400).json(err);
          }else{
            res.json(question);
          }
        });
      });
  },

  create: function(req, res){
    var newQuestion = new Question({
      title: req.body.title,
      text: req.body.text,
      verses: req.body.verses,
      category: req.body.category,
      originalAuthor: req.user._id
    });

    newQuestion.save(function(err, result){
      if(err){
        res.status(400).json(err);
      }else{
        res.json(result._id);
      }
    });
  },

  listRecent: function(req, res){
    Question
      .find({'downvotes.0': {$exists: false}})
      .sort('-updatedAt')
      .limit(5)
      .populate('originalAuthor', 'displayName _id')
      .exec(function(err, result){
      if(err){
        res.status(500).json(err);
      }else{
        res.json(result.map(question => question.makePublic()));
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
