"use strict";

var gulp = require('gulp');
var plumber = require('gulp-plumber');

var TEMPLATES_SRC = 'src/templates/**/*.html';

/**
 * Compiles templates.
 */
gulp.task('templates', function() {
	return gulp.src(TEMPLATES_SRC)
		.pipe(gulp.dest('app/templates'));
});

gulp.task('templates:watch', function() {
	gulp.watch(TEMPLATES_SRC, ['templates']);
});
