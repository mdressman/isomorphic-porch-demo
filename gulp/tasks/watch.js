"use strict";

var gulp  = require('gulp');
var config= require('../config');
var supervisor = require('gulp-supervisor');
var watch = require('gulp-watch');
var batch = require('gulp-batch');


function batchTask(task) {
    return batch(function () {
        console.log("RUNNING TASK: " + task);
        gulp.start(task);
    });
}

gulp.task('watch', ['build', 'setWatch'], function() {

  watch(config.jsFiles, batchTask('lint'));
  watch(config.less.lessFiles, batchTask('less'));
  watch(config.jsxFiles, batchTask('browserify'));

  supervisor( 'server', {
    watch: 'server',
    pollInterval: 200
  });

});
