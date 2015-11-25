var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var nodemon = require('gulp-nodemon');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

gulp.task('browserify', compileScripts)
    .task('serve', serve);
gulp.task('build', function() {

  browserify({
    entries: ['./client/home/router.jsx'],
    transform: [babelify], // we want to convert jsx to normal javascript
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packagecache: {},
    fullpaths: true
  })
  .bundle()
  .on('error', function(err) {
    console.log('error with compiling components', err.message);
  })
  .pipe(source('home-bundle.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./build/'));
  browserify({
    entries: ['./client/login/router.jsx'],
    transform: [babelify], // we want to convert jsx to normal javascript
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packagecache: {},
    fullpaths: true
  })
  .bundle()
  .on('error', function(err) {
    console.log('error with compiling components', err.message);
  })
  .pipe(source('login-bundle.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./build/'));
});

function compileScripts() {
  scripts('./client/home/router.jsx', 'home-bundle.js');
  scripts('./client/login/router.jsx', 'login-bundle.js');
}

function scripts(input, output) {
  var bundler = browserify({
    entries: [input],
    transform: [babelify], // We want to convert JSX to normal javascript
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  var watcher = watchify(bundler);

  return watcher
    .on('update', function() {
      var updateStart = Date.now();
      console.log('Updating!');
      watcher.bundle()
      .on('error', function(err) {
        console.log('Error with compiling components', err.message);
      })
      .pipe(source(output))
      .pipe(gulp.dest('./build/'));
      console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })

    // Create the initial bundle when starting the task
    .bundle()
    .on('error', function(err) {
      console.log('Error with compiling components', err.message);
    })
    .pipe(source(output))
    .pipe(gulp.dest('./build/'));
}

function serve() {
  nodemon({
    script: './server/server.js',
    ignore: ['client/*.js', 'build/*.js'],
    env: { 'NODE_ENV': 'DEVELOPMENT'}
  });
}

gulp.task('default', ['browserify', 'serve']);
