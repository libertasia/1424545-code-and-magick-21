/* eslint-disable no-var */
'use strict';

// Открытие/закрытие окна настройки персонажа, перемещение диалога:

(function () {
  var setupForm = window.setup.setupForm;
  var defaultTop = window.setup.defaultTop;
  var defaultLeft = window.setup.defaultLeft;
  var doIfEscEvent = window.util.keyboard.doIfEscEvent;
  var doIfEnterEvent = window.util.keyboard.doIfEnterEvent;
  var dialogHandle = window.move.dialogHandle;
  var initDialogMove = window.move.initDialogMove;

  var setupUserName = setupForm.querySelector(`.setup-user-name`);
  var setupOpen = document.querySelector(`.setup-open`);
  var setupClose = setupForm.querySelector(`.setup-close`);

  var dialog = {};

  dialog.setupUserName = setupUserName;
  dialog.dialogHandle = dialogHandle;

  window.dialog = dialog;

  var onPopupEscPress = function (evt) {
    if (document.activeElement !== setupUserName) {
      evt.preventDefault();
      doIfEscEvent(evt, closePopup);
    }
  };

  var openPopup = function () {
    setupForm.classList.remove(`hidden`);
    setupForm.style.top = defaultTop;
    setupForm.style.left = defaultLeft;

    document.addEventListener(`keydown`, onPopupEscPress);
  };

  var closePopup = function () {
    setupForm.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  setupOpen.addEventListener(`click`, function () {
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, function (evt) {
    doIfEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener(`click`, function () {
    closePopup();
  });

  setupClose.addEventListener(`keydown`, function (evt) {
    doIfEnterEvent(evt, closePopup);
  });

  var moveForm = function (shift) {
    setupForm.style.top = (setupForm.offsetTop - shift.y) + `px`;
    setupForm.style.left = (setupForm.offsetLeft - shift.x) + `px`;
  };

  initDialogMove(moveForm);
})();


