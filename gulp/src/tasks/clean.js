module.exports = () => {
  blinker.gulp.task('clean:build',
    blinker.plugins.delete.bind(null, [blinker.config.destinationPath, blinker.config.temporaryPath], {dot: true})
  );
  blinker.gulp.task('clean:dev',
    blinker.plugins.delete.bind(null, [blinker.config.temporaryPath], {dot: true})
  );
};