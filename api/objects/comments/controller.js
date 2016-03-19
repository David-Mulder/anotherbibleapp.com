var Comment = require('./model');
var Question = require('../questions/model');
var Answer = require('../answers/model');

module.exports = {
  _getPost: function(type, id){
    if(type == 'question'){
      return Question.findOne({_id: id}).exec();
    }else if(type == 'answer'){
      return Answer.findOne({_id: id}).exec();
    }else{
      console.log(type, id);
    }
  },
  create: function(req, res){

    var comment = new Comment({
      user: req.user._id,
      text: req.body.text,
      date: new Date()
    });

    comment.save().then((comment) =>{
      module.exports._getPost(req.params.type, req.params.id).then((post) => {
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

  },
  delete: function(req, res){
    Comment.findOne({
      _id: req.params.id
    }).populate('user', 'displayName deleted').exec().then(comment => {
      if(req.user.admin || comment.user._id.equals(req.user._id)){
        comment.deleted = !comment.deleted;
        comment.save().then((comment) => {
          res.json(comment);
        });
      }
    });
  }
};
