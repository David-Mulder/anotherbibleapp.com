/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  app._currentlyLoading = [];
  app.loading = function(name){
    app._currentlyLoading.push(name);
    app.isLoading = true;
  };
  app.finishedLoading = function(name){
    app._currentlyLoading.splice(app._currentlyLoading.indexOf(name), 1);
    app.isLoading = app._currentlyLoading.length > 0;
  };

  /*
  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!document.querySelector('platinum-sw-cache').disabled) {
      document.querySelector('#caching-complete').show();
    }
  };
  */

  var lazyEventQueue = new WeakMap();

  var lazyEvent = function(element, event, detail){
    if(element.constructor == HTMLElement){
      //element not yet registered, add to lazy event queue
      var events = [];
      if(lazyEventQueue.has(element)){
        events = lazyEventQueue.get(element);
      }
      events.push([event, detail]);
      lazyEventQueue.set(element, events);
    }else{
      element.fire(event, detail);
    }
  };

  var lazyFireEvents = function(element){
    if(lazyEventQueue.has(element)){
      var events = lazyEventQueue.get(element);
      console.info(events , 'for', element);
      events.forEach(event => console.debug(element,event[0], event[1]));
      console.debug(events.length,'length');
      //element.fire('page-became-visible', {});
      events.forEach(event => element.fire(event[0], event[1]));
      lazyEventQueue.delete(element);
    }else{
      console.log('no events for', element);
    }
  };

  app.loadedDependencies = [];
  app.loadDependency = function(el){

    app.loading(el);

    return new Promise(function(resolve, reject){
      if(app.loadedDependencies.indexOf(el) === -1){
        console.debug('loading', el);
        app.loadedDependencies.push(el);
        app.importHref('/elements/' + el + '.html', function(){

          document.getElementById('loading').style.opacity = 0;
          window.dispatchEvent(new Event('resize'));

          var element = document.querySelector(el.split('/').pop());
          lazyFireEvents(element);

          setTimeout(function(){
            app.finishedLoading(el);
          }, 0);

          resolve();

        }, function(){
          alert('Failed loading the requested page.');
        });
      }else{
        app.finishedLoading(el);
        resolve();
      }
    });
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('dom-change', function() {
    console.log('Our app is ready to rock!');
  });

  app.isNarrow = function(){
    return document.getElementById('mainDrawer').narrow;
  };

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {

    document.getElementById('mainDrawer').addEventListener('narrow-changed', function(){
      document.body.dispatchEvent(new CustomEvent("narrow-changed", {
        detail: {
          narrow: app.isNarrow()
        }
      }));
    });

    var func;
    var oldSelectedPage;
    document.querySelector('iron-pages').addEventListener('iron-select', func = function(){
      var pages = document.querySelector('iron-pages');
      var page = document.querySelector('iron-pages').selectedItem
      if(oldSelectedPage !== page){
        console.log('yeah');
        lazyEvent(page, 'page-became-visible', {});
        console.log('page became visible event sent', page);
        oldSelectedPage = page;
      }
      //document.querySelector('iron-pages').selectedItem.fire('page-became-visible');
    });
    func();

  });

  document.querySelector('body').addEventListener('click', function(ev){
    var el = ev.path[0];
    if(el.nodeName.toLowerCase() == 'a'){
      var href = el.getAttribute('href');
      if(href && href.replace(location.origin, '').substr(0,1) == '/'){
        page(href.replace(location.origin, ''));
        ev.preventDefault();
      }
    }
  });

  // Main area's paper-scroll-header-panel custom condensing transformation of
  // the appName in the middle-container and the bottom title in the bottom-container.
  // The appName is moved to top and shrunk on condensing. The bottom sub title
  // is shrunk to nothing on condensing.
  /*
  addEventListener('paper-header-transform', function(e) {
    var appName = document.querySelector('#mainToolbar .app-name');
    var middleContainer = document.querySelector('#mainToolbar .middle-container');
    var bottomContainer = document.querySelector('#mainToolbar .bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    var maxMiddleScale = 0.50;  // appName max size when condensed. The smaller the number the smaller the condensed size.
    var scaleMiddle = Math.max(maxMiddleScale, (heightDiff - detail.y) / (heightDiff / (1-maxMiddleScale))  + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    // Move/translate middleContainer
    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);

    // Scale bottomContainer and bottom sub title to nothing and back
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);

    // Scale middleContainer appName
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  });
  */

  // Close drawer after menu item is selected if drawerPanel is narrow
  app.closeDrawer = function() {
    var drawerPanel = document.querySelector('#mainDrawer');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  app.goToHome = function(){
    page('/');
  };

  app.isHome = function(){
    return app.route === 'home';
  };

  app.toast = function(msg, duration, affector){
    var pt = document.createElement('paper-toast');
    pt.duration = duration || 10000;
    if(affector){
      (affector.bind(pt))();
    }
    pt.opened = true;
    pt.text = msg;
    document.body.appendChild(pt);
    pt.addEventListener('iron-overlay-closed', function(){
      document.body.removeChild(pt);
    });
    var dismisser = function(){
      pt.opened = false;
      document.body.removeEventListener('page-navigation', dismisser);
    };
    document.body.addEventListener('page-navigation', dismisser);

    return pt;
  };

  app.askToast = function(msg, options, affector){
    return new Promise((resolve, reject) => {
      var pt = app.toast(msg, 25000, affector);

      options.forEach((option, i) => {
        var pb = document.createElement('paper-button');
        pb.textContent = option;
        pb.style.padding = '5px';
        pb.style.margin = '-5px 0px';
        pb.addEventListener('tap', function () {
          pt.close();
          resolve(option, i);
        });
        pt.appendChild(pb);
      });
    });
  };

  app.msg = function(msg, title){
    var pd = document.createElement('paper-dialog');
    pd.entryAnimation = 'scale-up-animation';
    pd.innerHTML = '<h1></h1><div></div><div class="buttons"></div>';
    pd.querySelector('div').textContent = msg;
    pd.querySelector('h1').textContent = title;
    if(typeof title == 'undefined'){
      pd.querySelector('h1').style.display = 'none';
    }
    pd.withBackdrop = true;
    document.body.appendChild(pd);
    pd.opened = true;
    pd.addEventListener('iron-overlay-closed', function(){
      document.body.removeChild(pd);
    });
    return pd;
  };

  app.ask = function(msg, title, options){
    return new Promise((resolve, reject) => {

      var pd = app.msg(msg, title);

      pd.addEventListener('iron-overlay-canceled', () => {
        reject();
      });

      options.forEach((option, i) => {
        var pb = document.createElement('paper-button');
        pb.textContent = option;
        pb.addEventListener('tap', function(){
          pd.close();
          resolve(option, i);
        });
        pd.querySelector('.buttons').appendChild(pb);
      });

    });
  };

})(document);
