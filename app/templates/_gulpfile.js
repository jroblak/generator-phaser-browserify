var gulp = require('gulp')
  , gutil = require('gulp-util')
  , del = require('del')
  , concat = require('gulp-concat')
  , rename = require('gulp-rename')
  , minifycss = require('gulp-minify-css')
  , minifyhtml = require('gulp-minify-html')
  , processhtml = require('gulp-processhtml')
  , jshint = require('gulp-jshint')
  , streamify = require('gulp-streamify')
  , uglify = require('gulp-uglify')
  , connect = require('gulp-connect')
  , source = require('vinyl-source-stream')
  , browserify = require('browserify')
  , watchify = require('watchify')
  , gulpif = require('gulp-if')
  , vinylPaths = require('vinyl-paths')
  , paths;

var watching = false;

paths = {
  assets: 'src/assets/**/*',
  css:    'src/css/*.css',
  libs:   [
    './src/bower_components/phaser-official/build/phaser.js'
  ],
  js:     ['src/js/*.js', 'src/js/**/*.js'],
  entry: './src/js/main.js',
  dist:   './dist/'
};

gulp.task('clean', function () {
	return gulp.src(paths.dist)
    .pipe(vinylPaths(del))
    .on('error', gutil.log);
});

gulp.task('copy', ['clean'], function () {
  gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dist + 'assets'))
    .on('error', gutil.log);
});

gulp.task('copylibs', ['clean'], function () {
  gulp.src(paths.libs)
    .pipe(gulpif(!watching, uglify({outSourceMaps: false})))
    .pipe(gulp.dest(paths.dist + 'js/lib'))
    .on('error', gutil.log);
});

gulp.task('compile', ['clean'], function () {
  var bundler = browserify({
    cache: {}, packageCache: {}, fullPaths: true,
    entries: [paths.entry],
    debug: watching
  });

  var bundlee = function() {
    return bundler
      .bundle()
      .pipe(source('main.min.js'))
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default'))
      .pipe(gulpif(!watching, streamify(uglify({outSourceMaps: false}))))
      .pipe(gulp.dest(paths.dist))
      .on('error', gutil.log);
  };

  if (watching) {
    bundler = watchify(bundler);
    bundler.on('update', bundlee);
  }

  return bundlee();
});

gulp.task('minifycss', ['clean'], function () {
 gulp.src(paths.css)
    .pipe(gulpif(!watching, minifycss({
      keepSpecialComments: false,
      removeEmpty: true
    })))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('processhtml', ['clean'], function() {
  return gulp.src('src/index.html')
    .pipe(processhtml({}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minifyhtml', ['processhtml'], function() {
  gulp.src('dist/index.html')
    .pipe(gulpif(!watching, minifyhtml()))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('html', ['build'], function(){
  gulp.src('dist/*.html')
    .pipe(connect.reload())
    .on('error', gutil.log);
});

gulp.task('connect', function () {
  connect.server({
    root: ['./dist'],
    port: 9000,
    livereload: true
  });
});

gulp.task('watch', function () {
  watching = true;
  return gulp.watch(['./src/index.html', paths.css, paths.js], ['build', 'html']);
});

gulp.task('default', ['connect', 'watch', 'build']);
gulp.task('build', ['clean', 'copy', 'copylibs', 'compile', 'minifycss', 'processhtml', 'minifyhtml']);
