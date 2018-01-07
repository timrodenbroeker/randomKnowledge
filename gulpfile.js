var gulp      = require('gulp');
var plumber   = require('gulp-plumber');
var sass      = require('gulp-sass');
var webserver = require('gulp-webserver');
var opn       = require('opn');
var uglify = require('gulp-uglify');


var sourcePaths = {
  styles: ['scss/*.scss']
};

var scriptPaths = {
  styles: ['js/*.js']
};

var distPaths = {
  styles: 'css'
};

var server = {
  host: 'localhost',
  port: '8001'
}

var concat = require('gulp-concat');
 
gulp.task('scripts', function() {
  return gulp.src([
    './js/global.js',
    './js/routing.js',
    './js/math.js',
    './js/api.js',
    './js/prepareMarkup.js',
    './js/view.js',
    './js/main.js'
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
  gulp.src( sourcePaths.styles )
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest( distPaths.styles ));
});

gulp.task('webserver', function() {
  gulp.src( '.' )
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    }));
});

gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.port );
});

gulp.task('watch', function(){
  gulp.watch(sourcePaths.styles, ['sass']);
  gulp.watch(scriptPaths.styles, ['scripts']);
});

gulp.task('build', ['sass']);

gulp.task('default', ['build', 'scripts', 'webserver', 'watch', 'openbrowser']);