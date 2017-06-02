"use strict";

var gulp = require('gulp');
var plumber = require('gulp-plumber');

var STATIC_SRC = 'src/static/**/*';

/**
 * Copies all static files to app.
 */
gulp.task('static', function() {
	return gulp.src(STATIC_SRC)
		.pipe(gulp.dest('app'));
});

gulp.task('static:watch', function() {
	gulp.watch(STATIC_SRC, ['static']);
});
