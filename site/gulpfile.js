/*global require: false*/

var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    ftp        = require('vinyl-ftp'),
    gutil      = require('gulp-util'),
    imagemin   = require('gulp-imagemin'),
    jshint     = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    pngquant   = require('imagemin-pngquant'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename'),
    sass       = require('gulp-sass'),
    imageop    = require('gulp-image-optimization');

gulp.task('deploy', function () {

    'use strict';

    var conn = ftp.create({
        host:     '',
        user:     '',
        password: '',
        parallel: 10,
        log:      gutil.log
    }),

        globs = [
            'html/**',
            'wordpress/**'
        ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src(globs, {base: '.', buffer: false})
        .pipe(conn.newer('/public_html')) // only upload newer files
        .pipe(conn.dest('/public_html'));
});

gulp.task('html', function () {

    'use strict';

    gulp.src('**/*/*.html')
        .pipe(livereload());
});

gulp.task('imagemin', function () {

    'use strict';

    return gulp.src('html/*')
        .pipe(imagemin({ progressive: true, svgoPlugins: [{removeViewBox: false}], use: [pngquant()]}))
        .pipe(gulp.dest('html/_imagesmin'));
});

gulp.task('imageoptimin', function (cb) {

    'use strict';

    gulp.src(['html/library/images/**/*.png', 'html/library/images/**/*.jpg', 'html/library/images/**/*.gif', 'html/library/images/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('html/library/imagesoptimin')).on('end', cb).on('error', cb);
});

gulp.task('lint', function () {

    'use strict';

    return gulp.src('development/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('php', function () {

    'use strict';

    gulp.src('**/*/*.php')
        .pipe(livereload());
});

gulp.task('sass', function () {

    'use strict';

    gulp.src('development/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
    //.pipe(sass({outputStyle: 'expanded'}))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('html/library/css'))
        .pipe(livereload());
});

gulp.task('scripts', function () {

    'use strict';

    return gulp.src('development/js/**/*.js')
        .pipe(concat('development/js/**/*.js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('html/library/js'))
        .pipe(livereload());
});

gulp.task('watch', function () {

    'use strict';

    gulp.watch('development/sass/**/*.scss', ['sass']);
    gulp.watch('development/js/**/*.js', ['lint', 'scripts']);
    gulp.watch(['**/*/*.php'], ['php']);
    gulp.watch(['**/*/*.html'], ['html']);

    livereload.listen();
});

gulp.task('default', ['sass', 'lint', 'scripts', 'watch']);
