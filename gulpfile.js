"use strict";

global.blinker = {
  gulp: require('gulp'),
  config: require('./config.json'),
  core: require('./gulp/export.js'),
  plugins: {
    twig: require('gulp-twig'),
    sass: require('gulp-sass'),
    autoprefixer: require('gulp-autoprefixer'),
    csso: require('gulp-csso'),
    browser_sync: require('browser-sync'),
    rename: require('gulp-rename'),
    delete: require('del'),
    concat: require('gulp-concat'),
    babel: require('gulp-babel'),
    png_sprite: require('gulp.spritesmith'),
    merge: require('merge-stream'),
    imagemin: require('gulp-imagemin'),
    clean: require('gulp-clean'),
    file_exist: require('files-exist'),
    uglify: require('gulp-uglify'),
    order: require('gulp-order'),
    source_maps: require('gulp-sourcemaps'),
    svg_min: require('gulp-svgmin'),
    svg_sprite: require('gulp-svg-sprite'),
    cheerio: require('gulp-cheerio'),
    replace: require('gulp-replace'),
    inline_css: require('gulp-inline-css')
  },
};

blinker.core.forEach(taskPath => {
  require(taskPath)()
});

if (blinker.config.critical_css) {
  blinker.plugins.critical = require('critical').stream;
}

blinker.core.errorHandler.initialize();

blinker.gulp.task('dev', blinker.gulp.series(
  blinker.gulp.parallel('clean:dev'),
  blinker.gulp.parallel('png-sprite', 'images:copy', 'fonts:copy', 'svg:sprite', 'svg:inline'),
  blinker.gulp.parallel('templates', 'styles', 'scripts:libraries', 'scripts'),
  blinker.gulp.parallel('watch', 'serve')
));

blinker.gulp.task('build', blinker.gulp.series(
  blinker.gulp.parallel('clean:build'),
  blinker.gulp.parallel('png-sprite', 'images:copy', 'fonts:copy', 'svg:sprite', 'svg:inline'),
  blinker.gulp.parallel('images:minify', 'templates', 'styles:build', 'scripts:libraries', 'scripts'),
  blinker.gulp.parallel('dist', 'scripts:build'),
  blinker.gulp.parallel('styles:inline'),
  blinker.gulp.parallel('styles:critical')
));
