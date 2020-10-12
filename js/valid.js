/* eslint-disable no-var */
'use strict';

// Валидация ввода имени персонажа:

(function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;

  var InvalidMessage = {
    REQUIRED_FIELD: `Обязательное поле`,
    NAME_TOO_SHORT: `Имя должно состоять минимум из 2-х символов`,
    NAME_TOO_LONG: `Имя не должно превышать 25-ти символов`
  };

  window.dialog.setupUserName.addEventListener(`invalid`, function () {
    if (window.dialog.setupUserName.validity.tooShort) {
      window.dialog.setupUserName.setCustomValidity(InvalidMessage.NAME_TOO_SHORT);
    } else if (window.dialog.setupUserName.validity.tooLong) {
      window.dialog.setupUserName.setCustomValidity(InvalidMessage.NAME_TOO_LONG);
    } else if (window.dialog.setupUserName.validity.valueMissing) {
      window.dialog.setupUserName.setCustomValidity(InvalidMessage.REQUIRED_FIELD);
    } else {
      window.dialog.setupUserName.setCustomValidity(``);
    }
  });

  window.dialog.setupUserName.addEventListener(`input`, function (evt) {
    var valueLength = evt.target.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      window.dialog.setupUserName.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
    } else if (valueLength > MAX_NAME_LENGTH) {
      window.dialog.setupUserName.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
    } else {
      window.dialog.setupUserName.setCustomValidity(``);
    }

    window.dialog.setupUserName.reportValidity();
  });
})();

