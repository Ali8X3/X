let gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// ----- scss -----
gulp.task('scss', function(done) {
    gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
    done();
});

// ----- serv -----
gulp.task('serv', function(done) {
    browserSync.init({
        server: "src/"
    });
    gulp.watch("app/scss/*.scss", gulp.series('scss'));
    gulp.watch("app/*.html").on('change', () => {
        browserSync.reload();
        done();
    });
    done();
});

gulp.task('default', gulp.series('scss', 'serv'));

