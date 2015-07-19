let gulp = require('gulp');
let browserSync = require('browser-sync');
let plumber = require('gulp-plumber');
let jade = require('gulp-jade');
let sass = require('gulp-sass');
let please = require('gulp-pleeease');
let notify = require('gulp-notify');

let options = {
  plumber: {
    errorHandler: notify.onError({
      message: 'Error: <%= error.message %>',
      sound: false,
      wait: true
    })
  }
};

gulp.task('markups', ['styles'], () => {
  return gulp.src(['dev/**/*.jade', '!dev/components/*.jade', '!dev/contents/*.jade'])
    .pipe(plumber(options.plumber))
    .pipe(jade())
    .pipe(gulp.dest('public/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', () => {
  return gulp.src('dev/style.scss')
    .pipe(plumber(options.plumber))
    .pipe(sass({
      errLogToConsole: true,
      sourceComments: 'normal'
    }))
    .pipe(please({
      'minifier': true,
      'autoprefixer': {'browsers': ['last 4 version', 'ie 8', 'iOS 4', 'Android 2.3']}
    }))
    .pipe(gulp.dest('dev/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('images', () => {
  return gulp.src(['dev/**/*.+(png|jpg|gif)'])
    .pipe(plumber(options.plumber))
    .pipe(gulp.dest('public/'));
});

gulp.task('browserSync', ['markups', 'images'], () => {
  return browserSync.init(null, {
    server: {baseDir: 'public/'},
    notify: false,
    open: 'external'
  });
});

gulp.task('watch', () => {
  gulp.watch(['dev/**/*.jade'], ['markups']);
  gulp.watch(['dev/**/*.scss'], ['markups']);
  gulp.watch(['dev/**/*.js'], ['markups']);
  // gulp.watch(['dev/**/*.scss'], ['styles']);
  // gulp.watch(['dev/**/*.js'], ['scripts']);
  gulp.watch(['dev/**/*.+(png|jpg|gif)'], ['images']);
});

gulp.task('develop', ['browserSync', 'watch']);
