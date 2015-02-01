
var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var streamqueue = require('streamqueue');
var print = require('gulp-print');

var sassSource = [
    './www/css/**/*.scss'
];

function compileSassTask() {

    return gulp.src(sassSource)
        .pipe(sass())
        .pipe(gulp.dest('./www/css'));
}

gulp.task('compileSass', compileSassTask);

gulp.task('watchSass', function () {

    watch(sassSource, function () {
        gulp.start('css')
    });

});

gulp.task('css', function () {

    var vendorCss = [
        './www/css/bootstrap.css',
        './www/css/spinner.css'
    ];

    var sources = streamqueue({ objectMode: true },
        gulp.src(vendorCss),
        compileSassTask());

    return gulp.src('./www/index.html')
        .pipe(inject(sources, { ignorePath: 'www' }))
        .pipe(gulp.dest('./www'));

});