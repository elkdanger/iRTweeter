/// <vs AfterBuild='build' SolutionOpened='watch_sass' />
var gulp = require('gulp');
var inject = require('gulp-inject');

var css = require('./Tasks/css');
var bower = require('./Tasks/bower');
var scripts = require('./Tasks/scripts');

gulp.task('scripts', ['compileScripts', 'injectScripts']);

// Primary build task
gulp.task('build', [
    'scripts',
    'css',
]);
