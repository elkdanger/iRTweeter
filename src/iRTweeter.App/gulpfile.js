/// <vs AfterBuild='bower' />
var gulp = require('gulp');
var bowerMain = require('main-bower-files');
var filter = require('gulp-filter');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

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

gulp.task('clean', function () {

    var src = [
    ];

    return gulp.src(src, { read: false })
        .pipe(clean());

});