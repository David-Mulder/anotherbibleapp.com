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

  /*
  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!document.querySelector('platinum-sw-cache').disabled) {
      document.querySelector('#caching-complete').show();
    }
  };
  */

  app.setTitle = function(title){
    if(title.length > 0){
      document.title = title + ' - Another Bible App';
    }else{
      document.title = 'Another Bible App'
    }
  };

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
      console.log(events , 'for', element);
      events.forEach(event => console.log(element,event[0], event[1]));
      events.forEach(event => element.fire(event[0], event[1]));
      lazyEventQueue.delete(element);
    }else{
      console.log('no events for', element);
    }
  };

  app.loadedDependencies = [];
  app.loadDependency = function(el){
    if(app.loadedDependencies.indexOf(el) === -1){
      console.debug('loading', el);
      app.loadedDependencies.push(el);
      app.importHref('/elements/' + el + '.html', function(){

        document.getElementById('loading').style.opacity = 0;
        window.dispatchEvent(new Event('resize'));

        var element = document.querySelector(el.split('/').pop());
        lazyFireEvents(element);

      }, function(){
        alert('Failed loading the requested page.');
      });
    }
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
    document.querySelector('iron-pages').addEventListener('iron-select', func = function(){
      console.log('HIERJA, IRON SELECT');
      lazyEvent(document.querySelector('iron-pages').selectedItem, 'page-became-visible', {});
      console.log('page became visible event sent');
      //document.querySelector('iron-pages').selectedItem.fire('page-became-visible');
    });
    func();

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
  app.onDataRouteClick = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  // Scroll page to top and expand header
  app.scrollPageToTop = function() {
    document.getElementById('mainContainer').scrollTop = 0;
  };

  app.goToHome = function(){
    page('/');
  };

  app.toast = function(msg){
    var pt = document.createElement('paper-toast');
    pt.opened = true;
    pt.duration = 10000;
    pt.text = msg;
    document.body.appendChild(pt);
  }

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
  }

})(document);
