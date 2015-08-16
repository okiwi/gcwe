'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var del = require('del');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');

var paths = {
    styles_vendors: [
        'bower_components/foundation/css/normalize.css',
        'bower_components/foundation/css/foundation.min.css',
        'bower_components/font-awesome/css/font-awesome.min.css',
        'bower_components/toastr/toastr.min.css'
    ],
    styles: [
        'assets/styles/**/*.scss'
    ],
    js_vendors: [
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/firebase/firebase.js',
        'bower_components/angularfire/dist/angularfire.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/toastr/toastr.min.js'
    ],
    js: [
        'app/**/*.module.js',
        'app/**/*.contants.js',
        'app/**/*.service.js',
        'app/**/*.js'
    ],
    html: [
        'app/**/*.html'
    ],
    build: 'static/',
    images: ['assets/images/**/*'],
    fonts: 'bower_components/font-awesome/fonts/**/*'
};

gulp.task('html', function () {
    return gulp.src(paths.html)
        .pipe(minifyHTML({
            empty: true
        }))
        .pipe(gulp.dest(paths.build + '/html'));
});


gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.build + '/fonts'));
});


gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.build + '/images'));
});

gulp.task('js_vendors', function () {
    return gulp.src(paths.js_vendors)
        .pipe(concat('vendors.min.js'))
        .pipe(gulp.dest(paths.build + '/js'));
});

gulp.task('js', function () {
    return gulp.src(paths.js)
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(paths.build + '/js'));
});

gulp.task('styles_vendors', function () {
    return gulp.src(paths.styles_vendors)
        .pipe(concat('vendors.min.css'))
        .pipe(gulp.dest(paths.build + '/styles'));
});

gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.min.css'))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(gulp.dest(paths.build + '/styles'));
});

gulp.task('clean', function (callback) {
    del(paths.build, {force: true}, callback);
});

gulp.task('build', ['clean'], function () {
    gulp.start('styles', 'styles_vendors', 'js', 'js_vendors', 'html', 'fonts', 'images');
});

gulp.task('watch', ['build'], function () {
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.js_vendors, ['js_vendors']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.styles_vendors, ['styles_vendors']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.fonts, ['fonts']);
    gulp.watch(paths.images, ['images']);
});

gulp.task('default', ['watch'], function () {

});