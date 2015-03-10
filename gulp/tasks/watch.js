"use strict";

var gulp  = require('gulp');
var config= require('../config');
var supervisor = require('gulp-supervisor');
var clc = require('cli-color');
var watch = require('gulp-watch');
var batch = require('gulp-batch');


function batchTask(task) {
    return batch(function () {
        console.log("RUNNING TASK: " + task);
        gulp.start(task);
    });
}

gulp.task('watch', ['build', 'setWatch'], function() {
  
  // be nice to new folks, let them know why this may be failing
  if(typeof(process.env.NODE_ENV) === 'undefined'){
  	console.log(clc.red("NODE_ENV is not set! ") + "You should probably add an environment variable named NODE_ENV and " +
    "set to 'development'");
  	return;
  }

  watch(config.jsFiles, batchTask('lint'));
  watch(config.images.src, batchTask('images'));
  watch(config.less.lessFiles, batchTask('less'));
  watch(config.jsxFiles, batchTask('browserify'));

 
  supervisor( 'server', {
    watch: 'server',
    pollInterval: 200
  });


});
