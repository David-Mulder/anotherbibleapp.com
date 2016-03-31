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
    setTimeout(function(){
      app.isLoading = app._currentlyLoading.length > 0;
    }, 400);
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
        app.navigateTo(href.replace(location.origin, ''));
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
  document.addEventListener('keydown', function(ev){
    console.log('down', ev.code);
    if(ev.code == 'ControlLeft' || ev.code == 'ControlRight'){
      ctrlDown = true;
    }else{
      //alert('he?');
    }
  });
  document.addEventListener('keyup', function(ev){
    console.log('up', ev.code);
    if(ev.code == 'ControlLeft' || ev.code == 'ControlRight'){
      ctrlDown = false;
    }
  });
  app.navigateTo = function(name){
    if(ctrlDown){
      var win = window.open(name);
      setTimeout(function(){
        win.focus();
      }, 0);
    }else{
      page(name);
    }
  };
  app.goToHome = function(){
    app.navigateTo('/');
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
