var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var babel = require('gulp-babel');

function errorHandler(error) {
  console.log(error.toString());
}

gulp.task('js', function () {
    return gulp.src('./scripts/*.js')
    .pipe(babel({
          presets: ['es2015']
        }))
    .pipe(
        gulp.dest('./build/scripts')
    )
    .pipe(
      browserSync.reload({
        stream:true
      })
    );
});

gulp.task('browser-sync', ['js'], function() {
  browserSync.init({
      server: {
          baseDir: "./",
          directory: true
      }
  });
});


gulp.task('watch', ['browser-sync'], function () {
    gulp.watch("**/*.html").on('change', browserSync.reload);
    gulp.watch(["scripts/*.js"],['js']);
    gulp.watch("styles/*.css").on('change', browserSync.reload);
});
