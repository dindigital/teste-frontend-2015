var gulp = require('gulp'),
		plumber = require('gulp-plumber'),
		rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
		cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var less = require('gulp-less');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			 baseDir: "./"
		}
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});

gulp.task('images', function(){
	gulp.src('images/src/**/*')
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest('images/'));
});

gulp.task('styles', function(){
	gulp.src(['css/less/**/*.less'])
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(less())
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('css/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('css/'))
		.pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
	return gulp.src('js/**/*.js')
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('js/'))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('js/'))
		.pipe(browserSync.reload({stream:true}))
});

gulp.task('default', ['browser-sync'], function(){
	gulp.watch("css/less/**/*.less", ['styles']);
	gulp.watch("js/**/*.js", ['scripts']);
	gulp.watch("*.html", ['bs-reload']);
});
