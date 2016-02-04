var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');
var packageJson = require('./package.json');
var crypto = require('crypto');
var merge = require('merge-stream');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var path = require('path');
var glob = require('glob');
var fs = require('fs');
var bower = require('gulp-bower');
var rimraf = require('gulp-rimraf');

// Copy all files at the root level (app)
gulp.task('copy', function () {
  var app = gulp.src([
    'app/**/*',
    '!app/test/*',
    '!app/cache-config.json'
  ], {
    dot: true
  }).pipe(gulp.dest('dist/web/public'));

  var server = gulp.src([
    'node_server/**/*'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));

  var api = gulp.src([
    'api/**/*',
    '!api/node_modules/**/*'
  ], {
    dot: true
  }).pipe(gulp.dest('dist/api'));

  var bower = gulp.src([
    'bower.json'
  ], {
    dot: true
  }).pipe(gulp.dest('dist/web/public'));

  return merge(app, server, api)
    .pipe($.size({title: 'copy'}));
});

gulp.task('bower', function() {
  return bower({cwd: './dist/web/public'}, ['--production']);
});

gulp.task('clean', function() {
  return gulp.src('./dist', { read: false })
    .pipe(rimraf({ force: true }));
});

// Generate config data for the <sw-precache-cache> element.
// This include a list of files that should be precached, as well as a (hopefully unique) cache
// id that ensure that multiple PSK projects don't share the same Cache Storage.
// This task does not run by default, but if you are interested in using service worker caching
// in your project, please enable it within the 'default' task.
// See https://github.com/PolymerElements/polymer-starter-kit#enable-service-worker-support
// for more context.
gulp.task('cache-config', function (callback) {
  var dir = 'dist/web/public';
  var config = {
    cacheId: packageJson.name || path.basename(__dirname),
    disabled: false
  };

  glob('{elements,scripts,styles,images,bower_components}/**/*.*', {cwd: dir}, function(error, files) {
    if (error) {
      callback(error);
    } else {
      files = files.filter(function(file){
        var extension = file.split('.').pop();
        return ['md', 'map', 'txt'].indexOf(extension) == -1 && file.indexOf('/demo/') == -1 && file.indexOf('/test/') == -1 && file.indexOf('bower.json') == -1  && file.indexOf('hero.svg') == -1;
      });
      files.push('index.html', './', 'bower_components/webcomponentsjs/webcomponents-lite.min.js');
      config.precache = files;

      var md5 = crypto.createHash('md5');
      md5.update(JSON.stringify(config.precache));
      config.precacheFingerprint = md5.digest('hex');

      var configPath = path.join(dir, 'cache-config.js');
      fs.writeFile(configPath, 'var config = '+JSON.stringify(config)+';', callback);
    }
  });
});

// Build production files, the default task
gulp.task('default', [], function (cb) {
  // Uncomment 'cache-config' after 'rename-index' if you are going to use service workers.
  runSequence(
    ['clean'],
    ['copy'],
    ['bower'],
    ['cache-config'],
    cb);
});

// Watch files for changes & reload
gulp.task('serve', [], function () {
  browserSync({
    port: 5000,
    notify: false,
    logPrefix: 'PSK',
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: function (snippet) {
          return snippet;
        }
      }
    },
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: ['app'],
      middleware: [ historyApiFallback() ],
      routes: {
        '/bower_components': 'bower_components',
        '/dev-generators': 'generators'
      }
    }
  });

  //gulp.watch(['app/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
  browserSync({
    port: 5001,
    notify: false,
    logPrefix: 'PSK',
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: function (snippet) {
          return snippet;
        }
      }
    },
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist/web/public',
    middleware: [ historyApiFallback() ]
  });

  gulp.watch(['app/**/*'], ['copy', 'cache-config', reload]);
});
