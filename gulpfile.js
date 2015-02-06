var gulp = require('gulp'),
autoprefixer = require('gulp-autoprefixer'),
rename = require('gulp-rename'),
minifycss = require('gulp-minify-css'),
less = require('gulp-less'),
livereload = require('gulp-livereload'),
connect = require('gulp-connect'),
jade = require('gulp-jade'),
lrport = 35729,
serverport = 4000;

gulp.task('html', function() {
  var YOUR_LOCALS = {};

  gulp.src('views/*.jade')
  .pipe(jade({
    locals: YOUR_LOCALS
  }))
  .pipe(gulp.dest('build'))
  .pipe(livereload());
});

gulp.task('express', function() {
  connect.server({
    livereload: true,
    root: ['./build']
  });
});

gulp.task('livereload', function() {
  gulp.src(['.tmp/styles/*.css', '.tmp/scripts/*.js'])
  .pipe(watch())
  .pipe(connect.reload());
});

gulp.task('styles', function() {
  gulp.src('less/**/*.less')
  .pipe(less({ style: 'expanded' }))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
  .pipe(gulp.dest('build/css'))
  .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['less/**/*.less'], ['styles']);
  gulp.watch('views/*.jade', ['html']);
});

gulp.task('default', ['styles', 'html', 'express', 'watch'], function() {

});
