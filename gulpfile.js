"use strict";

var browserify   = require('browserify');
var gulp         = require('gulp');
var sourcemaps   = require('gulp-sourcemaps');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var path         = require('path');
var supervisor   = require('gulp-supervisor');
var watch        = require('gulp-watch');
var batch        = require('gulp-batch');
var jshint       = require('gulp-jshint');
var react        = require('gulp-react');
var reporter     = 'jshint-stylish';
var concat       = require('gulp-concat');
var less         = require('gulp-less');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var mqpacker     = require('css-mqpacker');
var del          = require('del');

////////
gulp.task('clean', function(callback) {
  del(['dist/**'], callback);
});

////////
gulp.task('less', [], function () {
    var postProcessors = [
        autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'ie 8', 'ie 9'], cascade: false}),
        mqpacker
    ];
    var stream = gulp.src(['./src/app.less'])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(postcss(postProcessors))
        .pipe(sourcemaps.write('.', {sourceRoot: '/src'}))
        .pipe(gulp.dest('./dist'));
    return stream;
});


////////
gulp.task('lintJs', function() { 
    return gulp.src([
            './src/**/*.js',
            './server/**/*.js',
            '!server/index.js'
        ])
        .pipe(react())
        .on('error', function(e) {
            console.error(e.message + '\n  in ' + e.fileName);
        })
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(reporter))
        .pipe(jshint.reporter('fail'));
});

////////
gulp.task('browserify', function(callback) {

  var bundler = browserify({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: false,
    // Specify the entry point of your app
    entries: __dirname + '/src/client.js',
    // Add file extentions to make optional in your requires
    extensions: ['.jsx'],
    // Enable source maps!
    debug: true,
    // Search path to resolve absolute paths in require statements
    paths: [path.resolve(__dirname, '../../src')],
    basedir: path.resolve(__dirname, '../..')
  });

  var bundle = function() {
    bundler
      .bundle()
      // Use vinyl-source-stream to make the
      // stream gulp compatible. 
      .pipe(source('bundle.js'))
      // Uglify doesn't support streams, so buffer
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./', {sourceRoot: '/'}))
      // Specify the output destination
      .pipe(gulp.dest('./dist'))
      .on('end', callback);
  };
  return bundle();
});

////////
gulp.task('setWatch', function() {
  global.isWatching = true;
});

function batchTask(task) {
    return batch(function () {
        console.log("RUNNING TASK: " + task);
        gulp.start(task);
    });
}

gulp.task('watch', ['build', 'setWatch'], function() {
  watch([
      './src/**/*.js',
      './server/**/*.js',
      './gulp/**/*.js',
      '!server/index.js'
  ], batchTask('lintJs'));
  watch([
      './src/**/*.less'
  ], batchTask('less'));
  watch([
      './src/**/*.jsx'
  ], batchTask('browserify'));

  supervisor( 'server', {
    watch: 'server',
    pollInterval: 200
  });
});

////////
gulp.task('build', ['lintJs', 'browserify', 'less']);
gulp.task('default', ['clean', 'build']);

