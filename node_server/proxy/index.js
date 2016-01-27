var http = require("http");
var bouncy = require('bouncy');
var fs = require('fs');

var opts = {
  key: fs.readFileSync('/etc/letsencrypt/live/api.anotherbibleapp.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/api.anotherbibleapp.com/cert.pem')
};

var server = bouncy(opts, function (req, res, bounce) {
  if (req.headers.host === 'anotherbibleapp.com') {
    bounce(8001);
  }
  else if (req.headers.host === 'api.anotherbibleapp.com') {
    bounce(8002);
  }
  else {
    res.statusCode = 404;
    res.end('no such host');
  }
});
server.listen(443);

http.createServer(function (req, res) {
  res.writeHead(301, {"Location": "https://anotherbibleapp.com"+req.url});
  res.end();

}).listen(80);
