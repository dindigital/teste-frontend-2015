var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('./css/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./css/**/*.scss', ['sass']);
});
