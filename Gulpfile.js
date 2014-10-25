var gulp = require('gulp')
  , build = require('./gulp/build')
  , prettify = require('gulp-jsbeautifier');

gulp.task('default', function () {
  gulp.src('src/build.js')
    .pipe(build())
    .pipe(prettify({ indentSize: 4 }))
    .pipe(gulp.dest('dist'))
});
