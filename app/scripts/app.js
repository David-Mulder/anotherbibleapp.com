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

  app.crossNavigationalData = {};

  app._currentlyLoading = [];
  app.loading = function(name){
    console.info('started loading', name);

    app._currentlyLoading.push(name);
    app.isLoading = true;

  };
  app.finishedLoading = function(name){
    if(app._currentlyLoading.indexOf(name) >  -1){
      var finishedLoading = app._currentlyLoading.splice(app._currentlyLoading.indexOf(name), 1);
      console.info('finished loading', finishedLoading, 'input was',  name);
      setTimeout(function(){
        app.isLoading = app._currentlyLoading.length > 0;
      }, 100);
    }else{
      console.warn('Not currently loading: ', name);
    }
  };

  /*
  app.displayInstalledToast = function() {
    // Check to make sure caching is actually enabled—it won't be in the dev environment.
    if (!document.querySelector('platinum-sw-cache').disabled) {
      document.querySelector('#caching-complete').show();
    }
  };
  */

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

  });

  document.querySelector('body').addEventListener('click', function(ev){
    var el = Polymer.dom(ev).path[0];
    if(el.nodeName.toLowerCase() == 'a'){
      var href = el.getAttribute('href');
      if(href && href.replace(location.origin, '').substr(0,1) == '/'){
        app.navigateTo(href.replace(location.origin, ''), ev);
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

  var ctrlDown = false;
  var ctrlTimeout;
  document.addEventListener('keydown', function(ev){
    if(ev.code == 'ControlLeft' || ev.code == 'ControlRight'){
      ctrlDown = true;
    }
    ctrlTimeout = setTimeout(function(){
      ctrlDown = false;
    }, 5000);
  });
  document.addEventListener('keyup', function(ev){
    if(ev.code == 'ControlLeft' || ev.code == 'ControlRight'){
      ctrlDown = false;
      clearTimeout(ctrlTimeout);
    }
  });
  app.navigateTo = function(name, ev){
    var newWindow = false;
    if(ev){
      if(ev instanceof KeyboardEvent){
        newWindow = ev.ctrlKey;
      }else if(ev.detail.sourceEvent){
        newWindow = ev.detail.sourceEvent.ctrlKey;
      }else{
        newWindow = ev.ctrlKey;
      }
    }else if(ctrlDown){
      newWindow = true;
    }
    if(newWindow){
      var win = window.open(name);
      setTimeout(function(){
        win.focus();
      }, 0);
    }else{
      page(name);
    }
  };

  app.isHome = function(){
    return app.route === 'home';
  };

  var ignoredErrors = [''];
  var reload;
  var errorOverlay = document.querySelector('#error');
  var errorMessage = errorOverlay.querySelector('#error-message');

  window.onerror = function(err, file, line){
    if(ignoredErrors.indexOf(page.current) == -1){
      console.log(arguments);
      console.dir(err);
      errorMessage.textContent = err + '\n\n' + file + ':' + line;
      errorOverlay.style.display = 'block';
      if(!reload){
        reload = setTimeout(function(){
          location.reload(true);
        }, 15000);
      }
    }
  }
  document.getElementById('cancelErrorRefresh').addEventListener('click', function(ev){
    clearTimeout(reload);
    reload = 0;
    ev.stopPropagation();
  });
  document.getElementById('errorRefreshNow').addEventListener('click', function(ev){
    ev.stopPropagation();

    clearTimeout(reload);
    location.reload(true);
  });
  document.getElementById('error').addEventListener('click', function(){
    if(reload == 0){
      errorOverlay.style.display = 'none';
    }
  });

})(document);
