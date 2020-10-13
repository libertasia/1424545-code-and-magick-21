/* eslint-disable no-var */
'use strict';

(function () {
  var WIZARD_FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  var WIZARD_LAST_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  var WIZARD_COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  var WIZARD_EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
  var WIZARD_FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];

  var getRandomItem = window.util.getRandomItem;

  var similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  var similarListElement = document.querySelector(`.setup-similar-list`);


  var setupForm = document.querySelector(`.setup`);
  var setupWizardCoat = setupForm.querySelector(`.setup-wizard .wizard-coat`);
  var setupWizardCoatInput = setupForm.querySelector(`input[name="coat-color"]`);
  var setupWizardEyes = setupForm.querySelector(`.setup-wizard .wizard-eyes`);
  var setupWizardEyesInput = setupForm.querySelector(`input[name="eyes-color"]`);
  var setupFireballColor = setupForm.querySelector(`.setup-fireball-wrap`);
  var setupFireballColorInput = setupForm.querySelector(`input[name="fireball-color"]`);

  var setup = {};

  setup.setupForm = setupForm;
  setup.defaultTop = setupForm.style.top;
  setup.defaultLeft = setupForm.style.left;

  window.setup = setup;

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

})();

