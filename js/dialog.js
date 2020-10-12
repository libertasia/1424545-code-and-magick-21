/* eslint-disable no-var */
'use strict';

// Открытие/закрытие окна настройки персонажа:

(function () {
  var setupUserName = window.setup.setup.querySelector(`.setup-user-name`);
  var setupOpen = document.querySelector(`.setup-open`);
  var setupClose = window.setup.setup.querySelector(`.setup-close`);

  window.dialog = {
    setupUserName
  };

  var onPopupEscPress = function (evt) {
    if (document.activeElement !== setupUserName) {
      evt.preventDefault();
      window.util.doIfEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    window.setup.setup.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onPopupEscPress);
  };

  var closePopup = function () {
    window.setup.setup.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  setupOpen.addEventListener(`click`, function () {
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, function (evt) {
    window.util.doIfEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener(`click`, function () {
    closePopup();
  });

  setupClose.addEventListener(`keydown`, function (evt) {
    window.util.doIfEnterEvent(evt, closePopup);
  });
})();


