/* ==================================
        Dependencies Loading
   ================================== */

var gulp         = require('gulp'),
    uglify       = require('gulp-uglify'),
    concat       = require('gulp-concat'),
    jshint       = require('gulp-jshint'),
    concatCss    = require('gulp-concat-css'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss    = require('gulp-minify-css'),
    sass         = require('gulp-sass'),
    compass      = require('compass-importer'),
    rename       = require('gulp-rename'),
    kraken       = require('gulp-kraken'),
    sourcemaps   = require('gulp-sourcemaps'),
    sassdoc      = require('sassdoc'),
    browserSync  = require('browser-sync').create();

/* Settings */

var config = {
    src : {
        html    : './src/*.html',
        styles  : './src/assets/styles/**/*.{sass,scss}',
        scripts : './src/assets/scripts/*.js',
        images  : './src/assets/images/**/*.*',
        vendor  : './src/assets/vendor/**/*'
    },
    dest : {
        html   : './dest/',
        css    : './dest/assets/css/',
        js     : './dest/assets/js/',
        img    : './dest/assets/img/',
        vendor : './dest/assets/vendor/',
        maps   : './dest/assets/css/maps/'
    }
},
  sassdocOptions = {
    dest: './dest/sassdoc/'
  }

/* ==================================
        Tasks
   ================================== */

/* Scripts */
gulp.task( 'scripts', function() {
    gulp.src(config.src.scripts)
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.dest.js))
        .pipe(browserSync.stream());
});

/* Styles */
gulp.task( 'styles', function() {
    gulp.src( config.src.styles )
        /*.pipe(sourcemaps.init())*/
            .pipe(sass().on('error', sass.logError))
        /*.pipe(sourcemaps.write(config.dest.maps))*/
        /*.pipe(autoprefixer({ browsers: ['last 3 versions'] }))*/
        .pipe(gulp.dest(config.dest.css))
        .pipe(browserSync.stream());
});

/* Generating Docs for SASS */
gulp.task( 'sassdoc', function () {
    gulp.src( config.src.styles )
        .pipe( sassdoc( sassdocOptions ) )
        .resume();
});

gulp.task( 'html', function() {
    gulp.src( config.src.html )
        .pipe( gulp.dest( config.dest.html ) )
        .pipe(browserSync.stream());
});

gulp.task( 'images', function() {
    gulp.src( config.src.images )
        .pipe( gulp.dest( config.dest.img ) );
});

gulp.task( 'vendor', function() {
    gulp.src( config.src.vendor )
        .pipe( gulp.dest(config.dest.vendor) );
});

/* gulp.task('compass', function() {
  gulp.src('./sass/application.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: './assets/styles',
      sass: './sass',
      images: './img'
    }))
    .pipe(minifyCss())
    .pipe(rename('application.min.css'))
    .pipe(gulp.dest('assets/styles'));
}); */

gulp.task('serve', ['styles', 'html', 'scripts'], function() {

    browserSync.init({
        server: "./dest",
        port: 7000
    });

    gulp.watch(config.src.styles, ['styles']);
    gulp.watch(config.src.html, ['html']);
    gulp.watch(config.src.scripts, ['scripts']);
});

/* ==================================
        "To Production" Tasks
   ================================== */

gulp.task('prod', ['sassdoc'], function () {
    gulp.src(config.src.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
        .pipe(gulp.dest(config.dest.css));
});

/*gulp.task('kraken', function() {
    gulp.src(config.src.images)
        .pipe(kraken({
            key: '0ef7351bbf8f4e0384be1595d2e30f2c',
            secret: '5903351323698c5836d3c611c8274ec38a6ce139',
            lossy: true
        }))
        .pipe(gulp.dest(config.dest.img));
});*/

gulp.task('watch', function() {
  gulp.watch([gulp.src.styles], ['styles']);
  gulp.watch([gulp.src.scripts], ['scripts']);
  gulp.watch([gulp.src.html], ['html']);
});

gulp.task('default', ['html', 'scripts', 'styles', 'images', 'vendor', 'serve']);
