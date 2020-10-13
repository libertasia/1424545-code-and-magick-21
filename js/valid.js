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
  var setupUserName = window.dialog.setupUserName;

  setupUserName.addEventListener(`invalid`, function () {
    if (setupUserName.validity.tooShort) {
      setupUserName.setCustomValidity(InvalidMessage.NAME_TOO_SHORT);
    } else if (setupUserName.validity.tooLong) {
      setupUserName.setCustomValidity(InvalidMessage.NAME_TOO_LONG);
    } else if (setupUserName.validity.valueMissing) {
      setupUserName.setCustomValidity(InvalidMessage.REQUIRED_FIELD);
    } else {
      setupUserName.setCustomValidity(``);
    }
  });

  setupUserName.addEventListener(`input`, function (evt) {
    var valueLength = evt.target.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      setupUserName.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
    } else if (valueLength > MAX_NAME_LENGTH) {
      setupUserName.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
    } else {
      setupUserName.setCustomValidity(``);
    }

    setupUserName.reportValidity();
  });
})();

