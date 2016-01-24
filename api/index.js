var express = require('express');
var routes = require('./routes.js');
var rateLimit = require('express-rate-limit');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var authenticator = require('./objects/users/authenticator');

mongoose.connect('mongodb://localhost/test');

var app = express();

// proxies:
app.enable('trust proxy');

// cross origin access
var whitelist = ['http://localhost:5000', 'http://anotherbibleapp.com'];
app.use(cors({
  origin: function(origin, callback){
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
}));

// rate limiter:
var limiter = rateLimit({
  delayAfter: 10,
  max: 15
});
app.use(limiter);

// form data parser:
app.use(bodyParser.json());

app.use(authenticator.handleAuthentication);

routes.register(app);
