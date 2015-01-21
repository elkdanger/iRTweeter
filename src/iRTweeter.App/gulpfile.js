/// <vs AfterBuild='build' SolutionOpened='www_watch' />
var gulp = require('gulp');
var bowerMain = require('main-bower-files');
var filter = require('gulp-filter');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

/**
 * Bower copy
 */
gulp.task('bower', function () {

    var jsFilter = filter('*.js');
    var cssFilter = filter('*.css');
    var fontFilter = filter(['*.eot', '*.woff', '*.svg', '*.ttf'])

    // JS
    return gulp.src(bowerMain())
        .pipe(jsFilter)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./www/js/lib'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./www/js/lib'))
        .pipe(jsFilter.restore())

    // CSS
        .pipe(cssFilter)
        .pipe(gulp.dest('./www/css'))
        .pipe(cssFilter.restore())

    // Fonts
        .pipe(fontFilter)
        .pipe(gulp.dest('./www/fonts'));

});

/**
 * Compiling SASS
 */
gulp.task('sass', function () {

    return gulp.src([
        './www/css/**/*.scss'
    ])
    .pipe(sass())
    .pipe(gulp.dest('./www/css'));

});

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

/**
 * Watch task for compiling scripts and sass
 */
gulp.task('www_watch', function () {

    
    //   watch('./www/**/*.html')
    //    .pipe(gulp.dest('./bin/Debug/www'));

    //watch([
    //    './www/js/**/*.js',
    //    '!./www/js/lib'
    //])
    //.pipe(gulp.dest('./bin/Debug/www/js'));

    watch('./www/css/**/*.scss', function() {
        gulp.start('sass'); 
    });

});

// Primary build task
gulp.task('build', ['bower', 'scripts', 'sass']);
