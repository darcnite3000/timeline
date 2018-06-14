var gulp = require('gulp');
var changed = require('gulp-changed');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');

gulp.task('js', function() {
  gulp.src('src/timeline.js')
    .pipe(changed('.'))
    .pipe(babel())
    .pipe(gulp.dest('.'))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('.'));
});

gulp.task('watch',['js'], function() {
  gulp.watch(['src/**/*.js'], ['js'])
});

gulp.task('default',['watch']);