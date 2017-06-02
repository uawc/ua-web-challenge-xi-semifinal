"use strict";

var gulp = require('gulp');
var plumber = require('gulp-plumber');

var SERVER_SRC = 'src/server/**/*';
var DEPS_LIST = [
	'node_modules/@angular/*/bundles/*.js',
	'node_modules/rxjs/**/*.js',
	'node_modules/core-js/client/shim.min.js',
	'node_modules/zone.js/dist/zone.min.js',
	'node_modules/reflect-metadata/Reflect.js',
	'node_modules/systemjs/dist/system.js',
	'node_modules/underscore/underscore-min.js'
];

/**
 * Copies vendors that are being required in runtime.
 */
gulp.task('dependecies', function() {
	return gulp.src(DEPS_LIST, { base: 'node_modules' })
		.pipe(gulp.dest('app/lib'));
});
