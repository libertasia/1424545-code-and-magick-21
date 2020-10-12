/* eslint-disable no-var */
'use strict';

// Открытие/закрытие окна настройки персонажа:

(function () {
  var setupUserName = window.setup.setupForm.querySelector(`.setup-user-name`);
  var setupOpen = document.querySelector(`.setup-open`);
  var setupClose = window.setup.setupForm.querySelector(`.setup-close`);
  var dialogHandle = window.setup.setupForm.querySelector(`.upload`);

  window.dialog = {
    setupUserName,
    dialogHandle
  };

  var onPopupEscPress = function (evt) {
    if (document.activeElement !== setupUserName) {
      evt.preventDefault();
      window.util.doIfEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    window.setup.setupForm.classList.remove(`hidden`);
    window.setup.setupForm.style.top = window.setup.defaultTop;
    window.setup.setupForm.style.left = window.setup.defaultLeft;

    document.addEventListener(`keydown`, onPopupEscPress);
  };

  var closePopup = function () {
    window.setup.setupForm.classList.add(`hidden`);

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


