"use strict";

var config = require('../config');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var react = require('gulp-react');
var reporter = 'jshint-stylish';

gulp.task('lintJs', function() { 
    return gulp.src(config.jsFiles)
        .pipe(react())
        .on('error', function(e) {
            console.error(e.message + '\n  in ' + e.fileName);
        })
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(reporter))
        .pipe(jshint.reporter('fail'));
});
