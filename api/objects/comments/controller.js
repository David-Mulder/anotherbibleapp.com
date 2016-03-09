var Comment = require('./model');
var Question = require('../questions/model');
var Answer = require('../answers/model');

module.exports = {
  create: function(req, res){

    var comment = new Comment({
      user: req.user._id,
      text: req.body.text,
      date: new Date()
    });

    comment.save().then((comment) =>{

      if(req.params.type == 'question'){
        var post = Question.findOne({_id: req.params.id});
      }else if(req.params.type == 'answer'){
        var post = Answer.findOne({_id: req.params.id});
      }

      post.exec().then((post) => {
        post.comments.push(comment._id);
        post.save().then((post) => {
          comment.populate({
            path: 'user',
            select: 'displayName _id'
          });
          comment.execPopulate().then((comment) => {
            res.json(comment);
          });
        });
      });

    });

  }
};
