
var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var streamqueue = require('streamqueue');

/**
 * Compiling Css
 */
gulp.task('compileCss', function () {

    var output = gulp.src([
        './www/css/**/*.scss'
    ])
    .pipe(sass())
    .pipe(gulp.dest('./www/css'));
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