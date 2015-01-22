
var gulp = require('gulp');
var sass = require('gulp-sass');

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