var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var util = require('gulp-util');

var config = {
	jsDir: 'app/assets/js/',
	sassDir: 'app/assets/sass/',
	production: !!util.env.production
}

gulp.task('js', function(){
	// App and AppRoutes
	gulp.src([config.jsDir + '*.js'])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('./public/js'))

	// controllers
	gulp.src([config.jsDir + 'controllers/*.js'])
	.pipe(concat('controllers.js'))
	.pipe(gulp.dest('./public/js'))

	// services
	gulp.src([config.jsDir + 'services/*.js'])
	.pipe(concat('services.js'))
	.pipe(gulp.dest('./public/js'))

	// directives
	gulp.src([config.jsDir + 'directives/*.js'])
	.pipe(concat('directives.js'))
	.pipe(gulp.dest('./public/js'))

});


gulp.task('styles', function() {
    gulp.src('app/assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});


gulp.task('watch', function(){
	gulp.watch('app/assets/sass/**/*.scss',['styles']);
	gulp.watch('app/assets/js/**/*.js',['js']);
});


//Watch task
gulp.task('default', ['styles', 'js', 'watch']);