module.exports = () => {
  blinker.core.errorHandler = {
    initialize: function () {
      this.overrideBasicConsole();
    },

    overrideBasicConsole: function () {
      let error = console.error;
      console.error = function (message) {
        error(`${blinker.console.colors.foreground_red}Error: ${blinker.console.colors.reset}` + message);
      }
    }
  };

  blinker.console = {
    colors: {
      reset: "\x1b[0m",
      bright: "\x1b[1m",
      dim: "\x1b[2m",
      underscore: "\x1b[4m",
      blink: "\x1b[5m",
      reverse: "\x1b[7m",
      hidden: "\x1b[8m",
      foreground_black: "\x1b[30m",
      foreground_red: "\x1b[31m",
      foreground_green: "\x1b[32m",
      foreground_yellow: "\x1b[33m",
      foreground_blue: "\x1b[34m",
      foreground_magenta: "\x1b[35m",
      foreground_cyan: "\x1b[36m",
      foreground_white: "\x1b[37m",
      background_black: "\x1b[40m",
      background_red: "\x1b[41m",
      background_green: "\x1b[42m",
      background_yellow: "\x1b[43m",
      background_blue: "\x1b[44m",
      background_magenta: "\x1b[45m",
      background_cyan: "\x1b[46m",
      background_white: "\x1b[47m",
    },
  }
};