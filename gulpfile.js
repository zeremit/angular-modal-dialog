var bower = require('bower');

var underscore = require('underscore');
var underscoreStr = require('underscore.string');
var concat = require('gulp-concat');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');

var exclude = ['lib1', 'lib2'];

gulp.task('bower', function(cb){
    bower.commands.install([], {save: true}, {})
        .on('end', function(){
            cb(); // notify gulp that this task is finished
        });
});

gulp.task('concat-libs', ['bower'], function(){
    var bowerFile = require('./bower.json');
    var bowerPackages = bowerFile.dependencies;
    var bowerDir = './bower_components';
    var packagesOrder = [];
    var mainFiles = [];

    // Function for adding package name into packagesOrder array in the right order
    function addPackage(name){
        // package info and dependencies
        var info = require(bowerDir + '/' + name + '/bower.json');
        var dependencies = info.dependencies;

        // add dependencies by repeat the step
        if(!!dependencies){
            underscore.each(dependencies, function(value, key){
                if(exclude.indexOf(key) === -1){
                    addPackage(key);
                }
            });
        }

        // and then add this package into the packagesOrder array if they are not exist yet
        if(packagesOrder.indexOf(name) === -1){
            packagesOrder.push(name);
        }
    }

    // calculate the order of packages
    underscore.each(bowerPackages, function(value, key){
        if(exclude.indexOf(key) === -1){ // add to packagesOrder if it's not in exclude
            addPackage(key);
        }
    });

    // get the main files of packages base on the order
    underscore.each(packagesOrder, function(bowerPackage){
        var info = require(bowerDir + '/' + bowerPackage + '/bower.json');
        var main = info.main;
        var mainFile = main;

        // get only the .js file if mainFile is an array
        if(underscore.isArray(main)){
            underscore.each(main, function(file){
                if(underscoreStr.endsWith(file, '.js')){
                    mainFile = file;
                }
            });
        }

        // make the full path
        mainFile = bowerDir + '/' + bowerPackage + '/' + mainFile;

        // only add the main file if it's a js file
        if(underscoreStr.endsWith(mainFile, '.js')){
            mainFiles.push(mainFile);
        }
    });

    // run the gulp stream
    return gulp.src(mainFiles)
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('app/dist'));
});

gulp.task('build-libs', ['concat-libs'], function() {
    gulp.src('app/dist/libs.min.js')
        //.pipe(rename({suffix: '.min'}))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('app/dist'))
});

gulp.task('concat-app', function () {
    gulp.src(['src/js/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('app/dist'))
});

gulp.task('build-app', ['concat-app'], function() {
    gulp.src('app/dist/main.min.js')
        //.pipe(rename({suffix: '.min'}))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('app/dist'))
});

gulp.task('build', ['build-libs', 'build-app'], function () {

});

gulp.task('default', ['build-libs', 'build-app'], function () {
});

gulp.task('watch', ['concat-libs', 'concat-app'], function() {
    gulp.watch('src/js/**', function () {
        gulp.run('concat-app');
    });
    gulp.watch('bower_components/**', function () {
        gulp.run('concat-libs');
    });
});

gulp.task('compass', function() {
    gulp.src('./assets/sass/screen.sass')
        .pipe(compass({
            css: './assets/css',
            sass: './assets/sass',
            image: './assets/images'
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(gulp.dest('assets/css'));
});