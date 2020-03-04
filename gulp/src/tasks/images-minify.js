module.exports = () => {
  blinker.gulp.task('images:minify', () => {
    if (!blinker.config.minify_images) {
      return blinker.gulp.src([
        blinker.config.sourcePath + '/' + blinker.config.imagesDirectory + '/**/*.{png,jpg,gif}',
        '!./' + blinker.config.sourcePath + '/' + blinker.config.imagesDirectory + '/png_sprite/**/*',
      ])
        .pipe(blinker.gulp.dest(blinker.config.temporaryPath + '/' + blinker.config.imagesDirectory));
    }

    return blinker.gulp.src([
      blinker.config.sourcePath + '/' + blinker.config.imagesDirectory + '/**/*.{png,jpg,gif}',
      '!./' + blinker.config.sourcePath + '/' + blinker.config.imagesDirectory + '/png_sprite/**/*',
    ])
      .pipe(blinker.plugins.imagemin({
        interlaced: true,
        progressive: true,
        optimizationLevel: 5
      }))
      .pipe(blinker.gulp.dest(blinker.config.temporaryPath + '/' + blinker.config.imagesDirectory));
  });
};