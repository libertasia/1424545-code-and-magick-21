/* eslint-disable no-var */
'use strict';

// Открытие/закрытие окна настройки персонажа, перемещение диалога:

var setupFormContainer = window.setup.setupFormContainer;
var defaultTop = window.setup.defaultTop;
var defaultLeft = window.setup.defaultLeft;
var doIfEscEvent = window.util.keyboard.doIfEscEvent;
var doIfEnterEvent = window.util.keyboard.doIfEnterEvent;
var dialogHandle = window.move.dialogHandle;
var initDialogMove = window.move.initDialogMove;

var setupUserName = setupFormContainer.querySelector(`.setup-user-name`);
var setupOpen = document.querySelector(`.setup-open`);
var setupClose = setupFormContainer.querySelector(`.setup-close`);

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
  setupFormContainer.classList.remove(`hidden`);
  setupFormContainer.style.top = defaultTop;
  setupFormContainer.style.left = defaultLeft;

  document.addEventListener(`keydown`, onPopupEscPress);
};

var closePopup = function () {
  setupFormContainer.classList.add(`hidden`);

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
  setupFormContainer.style.top = (setupFormContainer.offsetTop - shift.y) + `px`;
  setupFormContainer.style.left = (setupFormContainer.offsetLeft - shift.x) + `px`;
};

initDialogMove(moveForm);
