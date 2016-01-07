var gulp = require('gulp'),
    sass = require('gulp-sass');
    uglify = require('gulp-uglify');

gulp.task('sass', function () {
  gulp.src('./css/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./css/**/*.scss', ['sass']);
});

gulp.task('minifyJS', function() {
  return gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

gulp.task('minifyCSS', function() {
  return gulp.src('./css/*.css')
    .pipe(uglify())
    .pipe(gulp.dest('./css'));
});
