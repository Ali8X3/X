
var gulp      = require('gulp'),
    sass        = require('gulp-sass'),
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename');
    // browserSync = require('browser-sync'),
    // concat      = require('gulp-concat'),
    // uglify      = require('gulp-uglifyjs'),

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('watch', ['css-libs', ], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    // gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    // gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

gulp.task('default', ['watch']);