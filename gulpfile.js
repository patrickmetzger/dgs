var gulp = require('gulp');
var sass = require('gulp-sass');


gulp.task('styles', function() {
    gulp.src('app/assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});


//Watch task
gulp.task('default',function() {
    gulp.watch('app/assets/sass/**/*.scss',['styles']);
});