module.exports = () => {
  blinker.gulp.task('serve', function () {
    blinker.plugins.browser_sync.init({
      notify: false,
      logPrefix: 'Blinker',
      logFileChanges: false,
      server: [blinker.config.temporaryPath, blinker.config.sourcePath],
      startPath: '/',
      logSnippet: false
    });
  });
};