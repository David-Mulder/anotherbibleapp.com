var Question = require('./model');
var Answer = require('../answers/model');

var deletionCheck = function(req, selector){
  if(req.user && req.user.admin){
    return selector;
  }else{
    selector.deleted = {$ne: true};
    return selector;
  }
};

module.exports = {
  get: function(req, res){
    var userId;
    if(req.user){
      userId = req.user._id;
    }
    Question
      .findOne(deletionCheck(req, {_id: req.params.id}))
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
      .findOne(deletionCheck(req, {_id: req.params.id}))
      .populate('originalAuthor', 'displayName _id')
      .populate('revisionAuthor', 'displayName _id')
      .populate({
        path: 'comments',
        match: req.user && req.user.admin ? {} : {deleted: {$ne: 1}},
        populate: {
          path: 'user',
          select: 'displayName _id'
        }
      })
      .exec(function(err, question){
        if(err) {
          res.status(500).json(err);
        }else if(question === null){
          res.status(404).json('Not found');
        }else{
          Answer
            .find(deletionCheck(req, {
              question: req.params.id
            }))
            .populate('originalAuthor', 'displayName _id')
            .populate('revisionAuthor', 'displayName _id')
            .populate({
              path: 'comments',
              match: req.user && req.user.admin ? {} : {deleted: {$ne: 1}},
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
      .find(deletionCheck(req, {'downvotes.0': {$exists: false}}))
      .sort('-createdAt')
      .limit(Math.min(req.query.count, 25))
      .populate('originalAuthor', 'displayName _id')
      .exec(function(err, result){
        if(err){
          res.status(500).json(err);
        }else{
          res.json(result.map(question => question.makePublic()));
        }
      });
  },

  listRecentlyActive: function(req, res){
    Question
      .find(deletionCheck(req, {}))
      .sort('-updatedAt')
      .limit(Math.min(req.query.count, 25))
      .populate('originalAuthor', 'displayName _id')
      .exec(function(err, result){
        if(err){
          res.status(500).json(err);
        }else{
          res.json(result.map(question => question.makePublic()));
        }
      });
  },

  listTopUnanswered: function(req, res){
    Question
      .find(deletionCheck(req, {'numberOfAnswers': 0}))
      .sort('-score')
      .limit(Math.min(req.query.count, 25))
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
    Question.find(deletionCheck(req, {
      verses: parseInt(req.params.verse)
    })).exec(function(err, result){
      if(err){
        res.status(500).json(err);
      }else{
        result = result.map(question => question.makePublic());
        result.sort((a,b) => b.score - a.score);
        res.json(result);
      }
    });
  },

  delete: function(req, res){
    if(req.user.admin){
      Question.findOne({
        _id: req.params.id
      })
        .populate('originalAuthor', 'displayName _id')
        .populate('revisionAuthor', 'displayName _id')
        .exec()
        .then(function(question){
          question.deleted = !question.deleted;
          question.save().then(function(question){
            res.json(question.makePublic());
          });
        });
    }
  }
};
