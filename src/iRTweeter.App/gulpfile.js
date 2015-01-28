/// <vs AfterBuild='build' SolutionOpened='watch_sass' />
var gulp = require('gulp');
var inject = require('gulp-inject');

var css = require('./Tasks/css');
var watch = require('./Tasks/watch')
var bower = require('./Tasks/bower');
var scripts = require('./Tasks/scripts');
var inject = require('./Tasks/inject');

// Primary build task
gulp.task('build', ['scripts', 'css', 'injectJs']);
