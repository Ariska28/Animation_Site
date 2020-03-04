module.exports = () => {
  blinker.gulp.task('svg:sprite', function () {
    return blinker.gulp.src(`${blinker.config.sourcePath}/${blinker.config.svgSpriteDirectory}/**/*.svg`)
      .pipe(blinker.plugins.svg_min())
      .pipe(blinker.plugins.svg_sprite({
        mode: {
          css: {
            "spacing": {
              "padding": 5
            },
            layout: "diagonal",
            dest: "./",
            sprite: `${blinker.config.temporaryPath}/${blinker.config.svgSpriteDirectory}/sprite.svg`,
            bust: false,
            render: {
              "scss": {
                "dest": `${blinker.config.sourcePath}/${blinker.config.stylesDirectory}/sprites/svg-sprite.scss`,
                "template": "./svg-sprite-template.txt"
              }
            }
          }
        }
      }))
      .pipe(blinker.gulp.dest("./"));
  });

  blinker.gulp.task('svg:inline', function () {
    return blinker.gulp.src(`${blinker.config.sourcePath}/${blinker.config.svgInlineSpriteDirectory}/**/*.svg`)
      .pipe(blinker.plugins.svg_min({
        js2svg: {
          pretty: true
        }
      }))
      .pipe(blinker.plugins.cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
          $('title').remove();
          $('style').remove();
        },
        parserOptions: {xmlMode: true}
      }))
      .pipe(blinker.plugins.replace('&gt;', '>'))
      .pipe(blinker.plugins.svg_sprite({
        mode: {
          symbol: {
            dest: './',
            example: false,
            bust: false,
            sprite: `${blinker.config.temporaryPath}/${blinker.config.svgInlineSpriteDirectory}/sprite_inline.svg`,
            inline: false,
            render: {
              scss: {
                dest: `${blinker.config.sourcePath}/${blinker.config.stylesDirectory}/sprites/svg-sprite-inline.scss`,
                template: "./svg-sprite-inline-template.txt"
              }
            }
          }
        }
      }))
      .pipe(blinker.gulp.dest("./"));
  });
};