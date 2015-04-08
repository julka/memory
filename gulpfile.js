var gulp = require('gulp');
var bower = require('gulp-bower');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');


var path = {
  js: [
    'source/**/*.js'
  ],
  buildRoot: 'build',
  bowerRoot: 'bower_components',
  minifiedFileName: 'memory.min.js'
};

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest(path.bowerRoot));
});

gulp.task('clean', function () {
  return gulp.src(path.buildRoot, {read: false})
    .pipe(clean());
});

gulp.task('minify-js', function() {
  return gulp.src(path.js)
    .pipe(sourcemaps.init())
    .pipe(concat(path.minifiedFileName))
    .pipe(uglify({mangle: false}))
    .pipe(sourcemaps.write('../' + path.buildRoot))
    .pipe(gulp.dest(path.buildRoot));
});

gulp.task('lint', ['clean'], function() {
  return gulp.src(path.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('build', ['lint'], function(){
  return gulp.start(
    'minify-js'
  );
});

gulp.task('watch', function() {
  var files = path.js;
  gulp.watch(files, ['build']);
});