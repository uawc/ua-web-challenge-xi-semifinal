"use strict";

var gulp = require('gulp');
var typescript = require('gulp-tsc');
var plumber = require('gulp-plumber');

var APP_SRC = 'src/js/**/*.ts';

/**
 * Compiling typescript files and copying them to app dir.
 */
gulp.task('app', function() {
	var compilerOptions = require('../tsconfig.json').compilerOptions;

	return gulp.src(['typings/index.d.ts', APP_SRC])
		.pipe(plumber())
		.pipe(typescript(compilerOptions))
		.pipe(gulp.dest('app/js'));
});

gulp.task('app:watch', function() { 
	gulp.watch(APP_SRC, ['app']); 
});
