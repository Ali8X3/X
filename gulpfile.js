let gulp = require('gulp'),
    sass = require('gulp-sass'),
    html_min = require('gulp-htmlmin');

// ------ html-min -----
gulp.task('html-min', function() {
    return gulp.src('app/**/*.html')
        .pipe(html_min({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
    done();
});

// ----- scss -----
gulp.task('scss', function(done) {
    gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
    done();
});

// ----- watch -----
gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/**/*.html', gulp.parallel('html-min'));
});

// ----- gulp -----
gulp.task('default', gulp.parallel('scss', 'html-min', 'watch'));

