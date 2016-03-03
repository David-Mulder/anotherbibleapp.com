var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var revisionSchema = new Schema({
  data: {
    type: Object
  },
  parent: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

var Revision = mongoose.model('revisions', revisionSchema);

module.exports = exports = function(schema, options) {

  schema.add({ updatedAt: Date })
  schema.add({ version: Number })

  schema.post('init', function() {
    this._original = this.toObject();
  });

  schema.pre('save', function (next) {

    this.updatedAt = new Date();

    if(this._original){
      if(typeof this._original.version == 'undefined'){
        this._original.version = 1;
      }

      var revision = new Revision({
        data: this._original,
        parent: this._id
      });
      revision.save();

      this.version = this._original.version + 1;
    }

    next();

  });

  schema.methods.history = function(){
    return new Promise((resolve, reject) => {
      var prom = Revision
        .find({parent: this._id})
        .sort({'data.updatedAt': -1})
        .exec();

      prom.then(function(revisions){
        var Model = options.model;

        revisions = revisions.map(rev => Model(rev.data));

        console.info('number of revisions:', revisions.length);

        resolve(revisions);
      }).catch(reject);

      /*
      Revision.find({parent: this._id}, function(err, revisions){
        if(err) return reject(err);

        var Model = options.model();

        revisions = revisions.map(rev => Model(rev.data))
        resolve(revisions);
      });
      */
    });
  };

};
