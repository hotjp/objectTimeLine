const gulp = require('gulp'),
  $ = require('gulp-load-plugins')();

gulp.task('js',function(){
  return gulp.src('src/**/*.js',{base:'src/'})
    .pipe($.babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/'));
});