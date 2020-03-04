module.exports = () => {
  blinker.gulp.task('png-sprite', function () {
        const spriteData = blinker.gulp.src(blinker.config.sourcePath + '/' + blinker.config.pngSpriteDirectory + '/*.png')
      .pipe(blinker.plugins.png_sprite({
        imgName: 'sprite.png',
        cssName: 'png-sprite.scss',
        cssFormat: 'scss',
        algorithm: 'binary-tree',
        cssTemplate: './png-sprite-template.txt',
        cssVarMap: function (sprite) {
          sprite.name = 'icon-' + sprite.name
        }
      }));

    const destImg = spriteData.img.pipe(blinker.gulp.dest(blinker.config.temporaryPath + '/' + blinker.config.pngSpriteDirectory));
    const destCss = spriteData.css.pipe(blinker.gulp.dest(blinker.config.sourcePath + '/' + blinker.config.stylesDirectory + '/sprites/'));

    return blinker.plugins.merge(destImg, destCss);
  });
};