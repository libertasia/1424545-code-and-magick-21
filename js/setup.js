/* eslint-disable no-var */
'use strict';

var WIZARD_FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
var WIZARD_LAST_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
var WIZARD_COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
var WIZARD_EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
var WIZARD_FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;

var Key = {
  ESC: `Escape`,
  ENTER: `Enter`
};

var InvalidMessage = {
  REQUIRED_FIELD: `Обязательное поле`,
  NAME_TOO_SHORT: `Имя должно состоять минимум из 2-х символов`,
  NAME_TOO_LONG: `Имя не должно превышать 25-ти символов`
};

var keyboard = {
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

var similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

var similarListElement = document.querySelector(`.setup-similar-list`);

var setupOpen = document.querySelector(`.setup-open`);
var setup = document.querySelector(`.setup`);
var setupClose = setup.querySelector(`.setup-close`);
var setupUserName = setup.querySelector(`.setup-user-name`);
var setupWizardCoat = setup.querySelector(`.setup-wizard .wizard-coat`);
var setupWizardCoatInput = setup.querySelector(`input[name="coat-color"]`);
var setupWizardEyes = setup.querySelector(`.setup-wizard .wizard-eyes`);
var setupWizardEyesInput = setup.querySelector(`input[name="eyes-color"]`);
var setupFireballColor = setup.querySelector(`.setup-fireball-wrap`);
var setupFireballColorInput = setup.querySelector(`input[name="fireball-color"]`);

var getRandomItem = function (items) {
  return items[Math.floor(Math.random() * items.length)];
};

var getWizardName = function () {
  var firstName = getRandomItem(WIZARD_FIRST_NAMES);
  var lastName = getRandomItem(WIZARD_LAST_NAMES);
  return `${firstName} ${lastName}`;
};

var getCoatColor = function () {
  return getRandomItem(WIZARD_COAT_COLORS);
};

var getEyesColor = function () {
  return getRandomItem(WIZARD_EYES_COLORS);
};

var getWizard = function () {
  return {
    name: getWizardName(),
    coatColor: getCoatColor(),
    eyesColor: getEyesColor()
  };
};

var getAllWizards = function () {
  var allWizards = [];
  for (var i = 0; i < 4; i++) {
    allWizards.push(getWizard());
  }
  return allWizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  wizards.forEach((wizard) => fragment.appendChild(renderWizard(wizard)));
  return fragment;
};

var drawWizards = function () {
  similarListElement.appendChild(renderWizards(getAllWizards()));
};

var showSetupPopup = function () {
  var userDialog = document.querySelector(`.setup`);
  var setupSimilar = userDialog.querySelector(`.setup-similar`);

  userDialog.classList.remove(`hidden`);
  setupSimilar.classList.remove(`hidden`);
};

drawWizards();
showSetupPopup();

// 4.10 Учебный проект: одеть Надежду.
// Открытие/закрытие окна настройки персонажа:

var onPopupEscPress = function (evt) {
  if (document.activeElement !== setupUserName) {
    evt.preventDefault();
    keyboard.doIfEscEvent(evt, closePopup);
  }
};

var openPopup = function () {
  setup.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  keyboard.doIfEnterEvent(evt, openPopup);
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === Key.ENTER) {
    closePopup();
  }
});

// Валидация ввода имени персонажа:

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

// Изменение цвета мантии персонажа по нажатию:

var changeCoatColor = function () {
  setupWizardCoat.style.fill = getCoatColor();
  setupWizardCoatInput.value = getCoatColor();
};

setupWizardCoat.addEventListener(`click`, changeCoatColor);

// Изменение цвета глаз персонажа по нажатию:

var changeEyesColor = function () {
  setupWizardEyes.style.fill = getEyesColor();
  setupWizardEyesInput.value = getEyesColor();
};

setupWizardEyes.addEventListener(`click`, changeEyesColor);

// Изменение цвета фаерболов по нажатию:

var getFireballColor = function () {
  return getRandomItem(WIZARD_FIREBALL_COLORS);
};

var changeFireballColor = function () {
  setupFireballColor.style.backgroundColor = getFireballColor();
  setupFireballColorInput.value = getFireballColor();
};

setupFireballColor.addEventListener(`click`, changeFireballColor);
