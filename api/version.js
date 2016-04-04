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

  options.ignore = options.ignore || [];

  options.ignore.push('updatedAt');
  options.ignore.push('createdAt');
  options.ignore.push('version');

  schema.add({ updatedAt: Date })
  schema.add({ createdAt: {type: Date, default: Date.now} });
  schema.add({ version: Number });

  schema.post('init', function() {
    this._original = this.toObject();
  });

  schema.pre('save', function (next) {

    var modified = false;
    schema.eachPath(prop => {
      if(this.isModified(prop)){
        if(options.ignore.indexOf(prop) == -1){
          console.log(options.ignore, options.ignore.indexOf(prop), prop);
          modified = true;
        }
      }
    });

    if(this._original){

      console.info('Post modified for new revision:',modified);

      if(modified) {

        this.updatedAt = new Date();

        if (typeof this._original.version == 'undefined') {
          this._original.version = 1;
        }

        var revision = new Revision({
          data: this._original,
          parent: this._id
        });
        revision.save();

        this.version = this._original.version + 1;
      }

    }else{
      this.updatedAt = new Date();
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
