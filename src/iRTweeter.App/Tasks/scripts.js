var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var inject = require('gulp-inject');

/**
 * Compiling/minifying scripts
 */
gulp.task('compileScripts', function () {

    var sources = [
        './www/js/app.js',
        './www/js/controllers/**/*.js',
        './www/js/services/**/*.js'
    ];

    return gulp.src(sources)
        .pipe(concat('app-compiled.js'))
        .pipe(gulp.dest('./www/js/lib'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./www/js/lib'));
});

gulp.task('injectScripts', function () {

    var sources = gulp.src([
        './www/js/app.js',
        './www/js/controllers/**/*.js',
        './www/js/services/**/*.js'
    ], { read: false });

    return gulp.src('./www/index.html')
        .pipe(inject(sources, { ignorePath: 'www' }))
        .pipe(gulp.dest('./www'));
});