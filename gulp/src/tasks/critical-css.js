module.exports = () => {
  blinker.gulp.task('styles:critical', function () {
    if (blinker.config.critical_css) {
      return blinker.gulp.src(blinker.config.destinationPath + '/**/*.{html,htm}')
        .pipe(blinker.plugins.critical({
          inline: false,
          base: `${blinker.config.destinationPath}/`,
          minify: true,
          css: [`${blinker.config.destinationPath}/${blinker.config.stylesDirectory}/style.css`],
          dimensions: [{
            height: 480,
            width: 320
          }, {
            height: 900,
            width: 1200
          }]
        }))
        .on('error', function (err) {
          console.error(err.message);
        })
        .pipe(blinker.gulp.dest(blinker.config.destinationPath + '/critical/'));
    }

    return blinker.gulp.src(blinker.config.destinationPath + '/html/**/*.html');
  });
};