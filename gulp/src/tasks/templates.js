module.exports = () => {
  blinker.gulp.task('templates', function () {
    if (blinker.config.template_engine === 'twig') {
      return blinker.gulp.src(`${blinker.config.sourcePath}/${blinker.config.viewsDirectory}/*.twig`)
        .pipe(blinker.plugins.twig({trace: false, debug: false}))
        .pipe(blinker.gulp.dest(`${blinker.config.temporaryPath}`))
        .pipe(blinker.plugins.browser_sync.reload({stream: true}));

    } else if (blinker.config.template_engine === 'html') {
      return blinker.gulp.src([
        `${blinker.config.sourcePath}/${blinker.config.viewsDirectory}/*.{html,htm}`,
      ])
        .pipe(blinker.gulp.dest(`${blinker.config.temporaryPath}`))
        .pipe(blinker.plugins.browser_sync.reload({stream: true}));
    }
  });
};