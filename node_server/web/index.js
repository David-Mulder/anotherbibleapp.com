var static = require('node-static');

var fileServer = new static.Server('./public');

require('http').createServer(function (request, response) {
  request.addListener('end', function () {
    if(request.url.indexOf('.') > -1){
      fileServer.serve(request, response);
    }else{
      fileServer.serveFile('/index.html', 200, {}, request, response);
    }
  }).resume();
}).listen(8001);
