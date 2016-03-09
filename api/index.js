var express = require('express');
var routes = require('./routes.js');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var authenticator = require('./objects/users/authenticator');

require('mongoose').Promise = Promise;

mongoose.connect('mongodb://localhost/test');

var app = express();

// proxies:
app.enable('trust proxy');

// cross origin access
var whitelist = ['http://localhost:5000', 'http://localhost:5001', 'https://anotherbibleapp.com'];
app.use(cors({
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
}));

// form data parser:
app.use(bodyParser.json());

app.use(authenticator.handleAuthentication);

routes.register(app);

app.listen(8002, function () {

});
