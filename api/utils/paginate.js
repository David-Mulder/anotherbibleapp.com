module.exports = function(query, req, res){
  var limit = Math.min(req.query.count, 25);
  var page = req.query.page || 1;
  var skip = (page-1)*limit;

  query.limit(limit + 1);
  query.skip(skip);
  query.exec(function(err, result){
    if(err){
      res.status(500).json(err);
    }else{
      res.json({
        results: result.splice(0, limit).map(question => question.makePublic()),
        moreResults: result.length > 0
      });
    }
  });
};
