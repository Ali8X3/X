let gulp =            require('gulp'),
    html_min =require('gulp-htmlmin'),
    sass =       require('gulp-sass'),
    jshint =   require('gulp-jshint'),
    uglify =   require('gulp-uglify'),
    concat =   require('gulp-concat'),
    imagemin = require('gulp-imagemin');

let paths = {
    // scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
    images: 'app/img/**/*'
};

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

// ----- js -----
gulp.task('js', function () {
    return gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build'));
});

// ----- images -----
gulp.task('images', function() {
    return gulp.src(paths.images)
        // Pass in options to the task
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('build/img'));
});


gulp.task('watch', function() {
    gulp.watch('app/**/*.html', gulp.parallel('html-min'));
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('app/js/**/*.js', gulp.parallel('js'));
    gulp.watch('app/img/**/*.*', gulp.parallel('images'));
});

// ----- watch -----
gulp.watch('app/**/*.html', gulp.series('html-min', function (){
    console.log('Компиляция файлов шаблона завершена');
}));

gulp.watch('app/scss/**/*.scss', gulp.parallel('scss', function (){
    console.log('Компиляция файлов шаблона завершена');
}));

gulp.watch('app/js/**/*.js', gulp.parallel('js', function (){
    console.log('Компиляция файлов шаблона завершена');
}));

gulp.watch('app/img/**/*.*', gulp.parallel('images', function (){
    console.log('Компиляция файлов шаблона завершена');
}));

// ----- gulp -----
// gulp.task('default', gulp.parallel('html-min', 'scss', 'js', 'images'));

gulp.task('default', gulp.series( gulp.parallel('html-min', 'scss'), gulp.parallel('js', 'images')));

// gulp.series( gulp.parallel(a, b), gulp.parallel(c, d) )
