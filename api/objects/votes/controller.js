var Answer = require('../answers/model');
var Question = require('../questions/model');

module.exports = {

  upvote: function(req, res){
    module.exports.vote('up', req).then(function(post){
      res.json(post);
    }).catch(function(err){
      res.status(500).json(err);
    });
  },

  downvote: function(req, res){
    module.exports.vote('down', req).then(function(post){
      res.json(post);
    }).catch(function(err){
      res.status(500).json(err);
    });
  },

  vote: function(direction, req){
    return new Promise(function(resolve, reject){

      var processVote = function(err, post){
        if(err){
          reject(err);
        }else{
          if(req.user && req.user._id.equals(post.originalAuthor._id)){
            return reject('You can\'t vote for your own post');
          }
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
              result.populate('originalAuthor', 'displayName _id')
                .populate('revisionAuthor', 'displayName _id')
                .execPopulate()
                .then(function(post){
                  resolve(result.makePublic(req.user._id));
                });
            }
          });
        }
      };

      if(req.params.type == 'answer'){
        Answer.findOne({
          _id: req.params.id
        }).populate('originalAuthor', 'displayName _id').exec(processVote);
      }else if(req.params.type == 'question'){
        Question.findOne({
          _id: req.params.id
        }).populate('originalAuthor', 'displayName _id').exec(processVote);
      }
    });
  }

};
