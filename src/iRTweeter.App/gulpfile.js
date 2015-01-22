/// <vs AfterBuild='build' SolutionOpened='watch_sass' />
var gulp = require('gulp');

var sass = require('./Tasks/sass');
var watch = require('./Tasks/watch')
var bower = require('./Tasks/bower');
var scripts = require('./Tasks/scripts');

// Primary build task
gulp.task('build', ['bower', 'scripts', 'sass']);
