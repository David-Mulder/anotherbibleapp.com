console.log('jaa?');

importScripts('bower_components/sw-toolbox/sw-toolbox.js');
importScripts('cache-config.js');

toolbox.router.get('/suggestions', function(request, values) {
  return new Response(JSON.stringify( ["sea",
    ["sears",
      "search engines",
      "search engine",
      "search",
      "sears.com",
      "seattle times"],
    ["7,390,000 results",
      "17,900,000 results",
      "25,700,000 results",
      "1,220,000,000 results",
      "1 result",
      "17,600,000 results"],
    ["http://example.com?q=sears",
      "http://example.com?q=search+engines",
      "http://example.com?q=search+engine",
      "http://example.com?q=search",
      "http://example.com?q=sears.com",
      "http://example.com?q=seattle+times"]]));
});

if(location.hostname === 'localhost'){

  console.info('Service Worker *not* in action');

  // to build the precache array run through the part of the application you wish to make available offline
  // switch in devtools to sw.js
  // run precache =  urls.concat(_BB.map(book => "/elements/text/text/"+book.name+".xml"))
  // `precache` is your precache list for cache-config.js

  var urls = [];

  var to;
  var counter = 0;
  toolbox.router.get('*', function(request, values, options) {
    var url = request.url.replace(location.origin, '');
    if(urls.indexOf(url) == -1 && url.indexOf('.xml') == -1 && url.indexOf('browser-sync') == -1) {
      urls.push(url);
      if (to) {
        clearTimeout(to);
      }
      to = setTimeout(function () {
        console.info('offline precache list builder: ', counter, '+', urls.length - counter , '=', urls.length);
        counter = urls.length;
      }, 5000);
    }
    //console.debug('Strategy: network only [' + request.url + ']', options);
    return fetch(request);
  });

}else{

  console.info('Service Worker in action', config);

  self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
  self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

  toolbox.options.cache.name = 'aba';

  toolbox.precache(config.precache);

  toolbox.router.get('*', toolbox.fastest);
  toolbox.router.get('*', toolbox.fastest, {origin: 'https://fonts.googleapis.com'});
  toolbox.router.get('*', toolbox.fastest, {origin: 'https://fonts.gstatic.com'});
  toolbox.router.get('*', function(request, values, options){
    return toolbox.networkFirst(request, values, options).catch(function(){
      return toolbox.cacheOnly(new Request('/imagess/mm.png'), values, options);
    });
  }, {origin: 'https://www.gravatar.com'});
  toolbox.router.get('*', toolbox.networkOnly, {origin: 'https://api.anotherbibleapp.com'});
  toolbox.router.get('*', toolbox.networkOnly, {origin: 'http://localhost:8002'});
  toolbox.router.get('*', toolbox.networkOnly, {origin: 'https://www.google-analytics.com'});
  toolbox.router.get('*', toolbox.networkOnly, {origin: 'https://storage.googleapis.com'});
  toolbox.router.get('*', toolbox.networkOnly, {origin: 'https://maps.googleapis.com'});
  toolbox.router.get('*', toolbox.networkOnly, {origin: 'https://maps.gstatic.com'});
  toolbox.router.get('*', toolbox.networkOnly, {origin: 'https://google-maps-utility-library-v3.googlecode.com'});

  toolbox.router.get(/^[^.]*?$/, function(request, values, options){
    toolbox.fastest(new Request('/'), values, options);
  });

  toolbox.router.default = function(req, val){
    console.warn('Unhandled request in sw', req.url);
    return fetch(req);
  };

}
