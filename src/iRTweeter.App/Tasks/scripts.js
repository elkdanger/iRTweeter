var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var rename = require('gulp-rename');

/**
 * Compiling/minifying scripts
 */
gulp.task('scripts', function () {

    return gulp.src([
        './www/js/app.js',
        './www/js/controllers/**/*.js',
        './www/js/services/**/*.js'
    ])
    .pipe(concat('app-compiled.js'))
    .pipe(gulp.dest('./www/js/lib'))
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./www/js/lib'));

});