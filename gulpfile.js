var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');

//Coloca prefixo dos navegadores, automaticamente
gulp.task('prefixer', function () {
    return gulp.src('site/src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('site/dist/css'));
});

//Comprime as imagens
gulp.task('imagemin', function () {
    return gulp.src('site/src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('site/dist/img'));
});

//Minifica o CSS
gulp.task('minify-css', function() {
  return gulp.src('site/src/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('site/dist/css'));
});

//SASS
gulp.task('sass', function () {
  return sass('site/src/scss/style.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('site/src/css/'));
});

//uglify
gulp.task('compress', function() {
  return gulp.src('site/src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('site/dist/js'));
});

//move
gulp.task('move', function() {
  return gulp.src('site/src/*.php')
  .pipe(gulp.dest('site/dist'));
});


//altera em tempo real
gulp.task('watch', function(){
  gulp.watch('site/src/*.php', ['move']);
  gulp.watch('site/src/scss/**/*.scss', ['sass','minify-css']);
  gulp.watch('site/src/css/**/*.css', ['minify-css']);
  gulp.watch('site/src/js/**/*.js', ['compress']);
  gulp.watch('site/src/img/**/*.{jpg,png}', ['imagemin']);
});

//build
gulp.task('build', ['sass', 'prefixer', 'minify-css', 'imagemin', 'compress']);