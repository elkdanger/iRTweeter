
var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var streamqueue = require('streamqueue');

/**
 * Compiling Css
 */
gulp.task('css', function () {

    var vendorCss = [
        './www/css/bootstrap.css'
    ];

    var output = gulp.src([
        './www/css/**/*.scss'
    ])
    .pipe(sass())
    .pipe(gulp.dest('./www/css'));

    var sources = streamqueue({ objectMode: true },
            gulp.src(vendorCss),
            output);
    
    gulp.src('./www/index.html')
        .pipe(inject(sources))
        .pipe(gulp.dest('./www'));
});