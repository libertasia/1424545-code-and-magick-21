/* eslint-disable no-var */
'use strict';

var Key = {
  ESC: `Escape`,
  ENTER: `Enter`
};

var util = {};

var keyboard = {};

util.getRandomItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

keyboard.doIfEscEvent = function (evt, callback) {
  if (evt.key === Key.ESC) {
    callback();
  }
};

keyboard.doIfEnterEvent = function (evt, callback) {
  if (evt.key === Key.ENTER) {
    callback();
  }
};

util.keyboard = keyboard;

window.util = util;



