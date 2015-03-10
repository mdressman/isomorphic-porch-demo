"use strict";

var handleErrors = require('../util/handle-errors');
var gulp         = require('gulp');
var sourcemaps   = require('gulp-sourcemaps');
var concat       = require('gulp-concat');
var less         = require('gulp-less');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var mqpacker     = require('css-mqpacker');
var config       = require('../config.js').less;

gulp.task('less', [], function () {

    var postProcessors = [
            autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'ie 8', 'ie 9'], cascade: false}),
            mqpacker
        ];

    var stream = gulp.src(config.src)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(postcss(postProcessors))
        .pipe(sourcemaps.write('.', {sourceRoot: '/src'}))
        .pipe(gulp.dest(config.dest))
        .on('error', handleErrors);

    return stream;    
});
