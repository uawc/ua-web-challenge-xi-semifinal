"use strict";

var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var path = require('path');

var LESS_SRC_PATH = 'src/css/**/*.less';

/**
 * Compiles each style file and places it in css dir.
 */
gulp.task('css', function() {
	return gulp.src(LESS_SRC_PATH)
		.pipe(plumber())
		.pipe(less({
			paths: [ path.join(__dirname, 'css', 'includes') ]
		}))
		.pipe(gulp.dest('app/css'));
});

gulp.task('css:watch', function() {
	gulp.watch(LESS_SRC_PATH, ['css']);
});

