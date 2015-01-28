var gulp = require('gulp');
var inject = require('gulp-inject');
var streamqueue = require('streamqueue');

gulp.task('injectJs', function () {

    var target = gulp.src('./www/index.html');

    var sources = gulp.src([
        './www/js/controllers/**/*.js',
        './www/js/services/**/*.js'
    ], { read: false });

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./www'));
});