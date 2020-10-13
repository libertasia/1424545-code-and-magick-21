/* eslint-disable no-var */
'use strict';

(function () {
  var dialogHandle = window.dialog.dialogHandle;
  var setupForm = window.setup.setupForm;

  var moveForm = function (shiftX, shiftY) {
    setupForm.style.top = (setupForm.offsetTop - shiftY) + `px`;
    setupForm.style.left = (setupForm.offsetLeft - shiftX) + `px`;
  };

  dialogHandle.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt, callback) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      callback(shift.x, shift.y);
    };

    var onMouseMoveHandler = function (e) {
      return onMouseMove(e, moveForm);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMoveHandler);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener(`click`, onClickPreventDefault);
        };
        dialogHandle.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMoveHandler);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
