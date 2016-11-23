"use strict";

let gulp = require('gulp');

require('./gulp-tasks/css');
require('./gulp-tasks/app');
require('./gulp-tasks/templates');
require('./gulp-tasks/generic');
require('./gulp-tasks/static');
require('./gulp-tasks/connect');
require('./gulp-tasks/clean');

gulp.task('compile', ['css', 'static', 'dependecies', 'templates', 'app']);
gulp.task('watch', ['css:watch', 'templates:watch', 'app:watch', 'static:watch']);


gulp.task('build', ['clean'], () => {
	gulp.run(['compile', 'connect', 'watch']);
});

gulp.task('default', ['build']);
