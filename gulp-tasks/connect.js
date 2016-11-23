"use strict";

let gulp = require('gulp');
let connect = require('gulp-connect');

gulp.task('connect', () => {
	connect.server({
		root: './app',
		port: 8000,
		livereload: true
	});
});
