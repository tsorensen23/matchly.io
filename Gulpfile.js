var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var nodemon = require('gulp-nodemon');
var babelify = require('babelify');

gulp.task('browserify', compileScripts)
    .task('serve', serve);

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
    ignore: ['client/*.js', 'build/*.js']
  });
}

gulp.task('default', ['browserify', 'serve']);
