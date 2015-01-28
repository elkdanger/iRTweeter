/// <vs AfterBuild='build' SolutionOpened='watch_sass' />
var gulp = require('gulp');
var inject = require('gulp-inject');

var sass = require('./Tasks/sass');
var watch = require('./Tasks/watch')
var bower = require('./Tasks/bower');
var scripts = require('./Tasks/scripts');
var inject = require('./Tasks/inject');

// Primary build task
gulp.task('build', ['scripts', 'sass', 'inject']);
