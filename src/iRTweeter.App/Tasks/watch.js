var gulp = require('gulp');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

/**
 * Watch task for compiling scripts and sass
 */
gulp.task('watch_sass', function () {


    //   watch('./www/**/*.html')
    //    .pipe(gulp.dest('./bin/Debug/www'));

    //watch([
    //    './www/js/**/*.js',
    //    '!./www/js/lib'
    //])
    //.pipe(gulp.dest('./bin/Debug/www/js'));

    watch('./www/css/**/*.scss', function () {
        gulp.start('sass');
    });

});
