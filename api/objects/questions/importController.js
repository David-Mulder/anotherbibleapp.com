var Question = require('./model');
var Answer = require('../answers/model');
var User = require('../users/model');

var fetch = require('node-fetch');

var Entities = require('html-entities').AllHtmlEntities;

var entities = new Entities();

module.exports = {
  christianityStackExchange: function(req, res){
    User.findOne({
      email: 'stackexchange@anotherbibleapp.com'
    }).exec().then(function(user){
      fetch('http://api.stackexchange.com/2.2/questions/'+req.params.id+'?order=desc&sort=activity&site=christianity&filter=!)5J-0UNpoaNd96s*fEXoTq0JhCZU')
        .then(response => response.text())
        .then(text => {
          var SEQuestion = JSON.parse(text).items[0];
          var question = new Question({
            title: entities.decode(SEQuestion.title),
            text: entities.decode(SEQuestion.body_markdown),
            category: req.query.category,
            upvotes: [],
            downvotes: [],
            score: SEQuestion.score,
            verses: req.query.verses.split(',').map(v => v*1),
            originalAuthor: user,
            numberOfAnswers: SEQuestion.answer_count,
            createdAt: SEQuestion.creation_date*1000,
            updatedAt: SEQuestion.creation_date*1000,
            source: {
              type: 'CH.SE',
              link: SEQuestion.link,
              id: SEQuestion.question_id,
              user: {
                displayName: entities.decode(SEQuestion.owner.display_name),
                link: SEQuestion.user_type == 'does_not_exist' ? '' : SEQuestion.owner.link,
              }
            }
          });
          for(var i=0;i<SEQuestion.up_vote_count;i++){
            question.upvotes.push(-2);
          }
          for(var i=0;i<SEQuestion.down_vote_count;i++){
            question.upvotes.push(-2);
          }
          question.save().then(function(question){
            fetch('http://api.stackexchange.com/2.2/questions/'+req.params.id+'/answers?order=desc&sort=activity&site=christianity&filter=!)5J-0UNpoaNd96s*fEXoTq0JhCZU')
              .then(response => response.text())
              .then(text => {
                var SEAnswers = JSON.parse(text).items;
                var answers = [];
                SEAnswers.forEach(function(SEAnswer){
                  console.log(SEAnswer.answer_id, SEAnswer.owner.display_name);
                  var answer = new Answer({
                    text: entities.decode(SEAnswer.body_markdown),
                    score: SEAnswer.score,
                    upvotes: [],
                    downvotes: [],
                    createdAt: SEAnswer.creation_date*1000,
                    updatedAt: SEAnswer.creation_date*1000,
                    question: question._id,
                    originalAuthor: user,
                    source: {
                      type: 'CH.SE',
                      id: SEAnswer.answer_id,
                      user: {
                        displayName: entities.decode(SEAnswer.owner.display_name),
                        link: SEAnswer.user_type == 'does_not_exist' ? '' : SEAnswer.owner.link,
                      }
                    }
                  });

                  for(var i=0;i<SEAnswer.up_vote_count;i++){
                    answer.upvotes.push(-2);
                  }
                  for(var i=0;i<SEAnswer.down_vote_count;i++){
                    answer.upvotes.push(-2);
                  }

                  answers.push(answer.save());
                });
                Promise.all(answers).then(function(results){
                  res.json({
                    question: question,
                    answers: results
                  })
                });
              });
          });
        });
    });

  }
};
