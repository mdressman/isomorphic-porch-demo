/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   This task is set up to generate multiple separate bundles, from
   different sources, and to use Watchify when run from the default task.

   See browserify.bundleConfigs in gulp/config.js
*/

"use strict";

var browserify   = require('browserify');
var bundleLogger = require('../util/bundle-logger');
var gulp         = require('gulp');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handle-errors');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var config       = require('../config').browserify;
var path         = require('path');

gulp.task('browserify', function(callback) {

  var bundleQueue = config.bundleConfigs.length;

  var browserifyThis = function(bundleConfig) {

    var bundler = browserify({
      // Required watchify args
      cache: {}, packageCache: {}, fullPaths: false,
      // Specify the entry point of your app
      entries: bundleConfig.entries,
      // Add file extentions to make optional in your requires
      extensions: config.extensions,
      // Enable source maps!
      debug: true,
      // Search path to resolve absolute paths in require statements
      paths: [path.resolve(__dirname, '../../src')],
      basedir: path.resolve(__dirname, '../..')
    });

    var bundle = function() {
      // Log when bundling starts
      bundleLogger.start(bundleConfig.outputName);

      bundler
        .bundle()
        // Use vinyl-source-stream to make the
        // stream gulp compatible. Specifiy the
        // desired output filename here.
        .pipe(source(bundleConfig.outputName))
        // Uglify doesn't support streams, so buffer
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./', {sourceRoot: '/'}))
        // Specify the output destination
        .pipe(gulp.dest(bundleConfig.dest))
        // Report compile errors
        .on('error', handleErrors)
        .on('end', reportFinished);
    };

    var reportFinished = function() {
      // Log when bundling completes
      bundleLogger.end(bundleConfig.outputName);

      if (bundleQueue) {
        bundleQueue--;
        if (bundleQueue === 0) {
          // If queue is empty, tell gulp the task is complete.
          // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
          callback();
        }
      }
    };

    return bundle();
  };

  config.bundleConfigs.forEach(browserifyThis);

});
