
var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var sourceMaps = require('gulp-sourcemaps');
var streamqueue = require('streamqueue');

var sassSource = [
    './www/css/**/*.scss'
];

/**
 * Compiling Sass
 */
gulp.task('compileSass', function () {

    return gulp.src(sassSource)
        .pipe(sourceMaps.init())
        .pipe(sass())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./www/css'));
});

gulp.task('watchSass', function () {

    watch(sassSource, function () {
        gulp.start('css')
    });

});

gulp.task('injectCss', function () {

    var vendorCss = [
        './www/css/bootstrap.css'
    ];

    var sources = streamqueue({ objectMode: true },
        gulp.src(vendorCss),
        gulp.src([
            './www/css/**/*.css',
            '!./www/css/bootstrap.css'
        ]));

    return gulp.src('./www/index.html')
        .pipe(inject(sources, { ignorePath: 'www' }))
        .pipe(gulp.dest('./www'));

});