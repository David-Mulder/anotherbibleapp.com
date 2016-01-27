console.log('jaa?');

importScripts('bower_components/sw-toolbox/sw-toolbox.js');
importScripts('cache-config.js');

if(config.disabled){
  console.info('Service Worker *not* in action');
}else{
  console.info('Service Worker in action', config);

  self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
  self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));

  toolbox.options.cacheName = config.cacheId

  toolbox.precache(config.precache);

  toolbox.router.get('*', toolbox.fastest);
  toolbox.router.get('*', toolbox.fastest, {origin: 'https://fonts.googleapis.com'});
  toolbox.router.get('*', toolbox.fastest, {origin: 'https://fonts.gstatic.com'});
  toolbox.router.get('*', toolbox.networkOnly, {origin: 'https://api.anotherbibleapp.com'});
  toolbox.router.get('*', toolbox.networkOnly, {origin: 'http://localhost:8002'});

  toolbox.router.default = function(req, val){
    console.warn('Unhandled request in sw', req.url);
    return fetch(req);
  };

}
