/* eslint-disable no-var */
'use strict';

(function () {
  var Key = {
    ESC: `Escape`,
    ENTER: `Enter`
  };

  window.util = {
    doIfEscEvent(evt, callback) {
      if (evt.key === Key.ESC) {
        callback();
      }
    },
    doIfEnterEvent(evt, callback) {
      if (evt.key === Key.ENTER) {
        callback();
      }
    }
  };
})();


