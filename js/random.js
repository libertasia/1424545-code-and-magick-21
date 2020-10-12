/* eslint-disable no-var */
'use strict';

(function () {
  window.random = {
    getRandomItem(items) {
      return items[Math.floor(Math.random() * items.length)];
    }
  };
})();
