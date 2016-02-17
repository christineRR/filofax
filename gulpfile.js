require('babel-core/register');
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-babel-istanbul');

gulp.task('istanbul', function() {
  return gulp.src('./src/**/*.js')
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
});

gulp.task('test',['istanbul'], function() {
  return gulp.src('./test/**/*.test.js')
    .pipe(mocha({require:['./test/env.js']}))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.enforceThresholds({thresholds: {global: 60}}))
});
