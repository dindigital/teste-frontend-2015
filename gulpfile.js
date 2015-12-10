/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-minify-css gulp-jade del gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del sprity sprity-sass --save-dev
 */

// Load plugins
var gulp = require('gulp'),
sass = require('gulp-ruby-sass');
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
jshint = require('gulp-jshint'),
gutil = require('gulp-util'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
concat = require('gulp-concat'),
sprity = require('sprity');
gulpif = require('gulp-if'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
livereload = require('gulp-livereload'),
jade = require('gulp-jade'),
del = require('del');

// Styles
gulp.task('styles', function() {
  return sass('src/styles/**/*.scss')
    .on('error', notify.onError("Error: Styles Error"))
    .on('error', gutil.log)
    .pipe(concat('styles.css'))
    .pipe(autoprefixer({
        browsers: ['last 2 version', 'ios 6', 'android 4']
    }))
    .pipe(gulp.dest('public/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('public/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
  // .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(concat('main.js'))
  .pipe(gulp.dest('public/assets/js'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(uglify())
  .pipe(gulp.dest('public/assets/js'))
  .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('vendors', function() {
  return gulp.src('vendors/**/*.js')
  .pipe(concat('vendors.js'))
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('public/assets/js/app'))
  .pipe(notify({ message: 'vendors task complete' }));
});

// Jade - Templates

gulp.task('templates', function() {
  return gulp.src('src/templates/pages/**/*.jade')
    .pipe(jade({
      basedir: "src/templates/"
    }))
    .on('error', notify.onError("Error: Jade Error"))
    .on('error', gutil.log)
    .pipe(gulp.dest('public/'))
    .pipe(notify({ message: 'templates task complete' }));
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
  .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
  .pipe(gulp.dest('public/assets/images'))
  .pipe(notify({ message: 'Images task complete' }));
});

// Sprite
gulp.task('sprites', function () {
  return sprity.src({
    src: 'src/images/spritesheet/*.{png,jpg}',
    style: '_sprite.scss',
    // ... other optional options 
    // for example if you want to generate scss instead of css 
    processor: 'sass', // make sure you have installed sprity-sass 
  })
  .pipe(gulpif('*.png', gulp.dest('public/assets/images/'), gulp.dest('src/styles/')))
});

// Clean
gulp.task('clean', function(cb) {
  del(['public/assets/css', 'public/assets/js', 'public/assets/img'], cb)
});

// Default task
gulp.task('default', ['clean','sprites', 'templates', 'styles'], function() {
  gulp.start('styles', 'templates', 'uncache', 'scripts', 'vendors', 'images');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .jade files
  gulp.watch('src/**/*.jade', ['templates']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Watch .js vendors files
  gulp.watch('vendors/js/**/*.js', ['vendors']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['public/**']).on('change', livereload.changed);

});