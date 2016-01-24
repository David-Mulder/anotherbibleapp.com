var Answer = require('../answers/model');
var Question = require('../questions/model');

module.exports = {
  upvote: function(req, res){

    module.exports.vote('up', req).then(function(post){
      res.json(post);
    }).catch(function(){
      res.status(500).json('noooz');
    });

  },
  downvote: function(req, res){
    console.log('so far so well');
    module.exports.vote('down', req).then(function(post){
      res.json(post);
    }).catch(function(){
      res.status(500).json('noooz');
    });

  },
  vote: function(direction, req){
    return new Promise(function(resolve, reject){

      var processVote = function(err, post){
        if(err){
          reject(err);
        }else{
          if(typeof post.upvotes === 'undefined'){
            post.upvotes = [];
          }
          if(typeof post.downvotes === 'undefined'){
            post.downvotes = [];
          }
          var votedArray = direction === 'up' ? post.upvotes : post.downvotes;
          var unvotedArray = direction === 'down' ? post.upvotes : post.downvotes;

          if(unvotedArray.indexOf(req.user._id) > -1){
            unvotedArray.splice(post.downvotes.indexOf(req.user._id), 1);
          }

          if(votedArray.indexOf(req.user._id) == -1){
            votedArray.push(req.user._id);
          }

          post.save(function(err, result){
            if(err){
              reject(err);
            }else{
              resolve(result.makePublic(req.user._id));
            }
          });
        }
      };

      if(req.params.type == 'answer'){
        Answer.findOne({
          _id: req.params.id
        }).populate('user', 'displayName _id').exec(processVote);
      }else if(req.params.type == 'question'){
        Question.findOne({
          _id: req.params.id
        }).populate('user', 'displayName _id').exec(processVote);
      }
    });
  }
};
