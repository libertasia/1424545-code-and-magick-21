/* eslint-disable no-var */
'use strict';

(function () {
  // var WIZARD_FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  // var WIZARD_LAST_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  var WIZARD_COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  var WIZARD_EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
  var WIZARD_FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  var MAX_SIMILAR_WIZARD_COUNT = 4;

  var getRandomItem = window.util.getRandomItem;

  var similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
    .content
    .querySelector(`.setup-similar-item`);

  var similarListElement = document.querySelector(`.setup-similar-list`);


  var setupFormContainer = document.querySelector(`.setup`);
  var setupForm = setupFormContainer.querySelector(`.setup-wizard-form`);
  var setupWizardCoat = setupFormContainer.querySelector(`.setup-wizard .wizard-coat`);
  var setupWizardCoatInput = setupFormContainer.querySelector(`input[name="coat-color"]`);
  var setupWizardEyes = setupFormContainer.querySelector(`.setup-wizard .wizard-eyes`);
  var setupWizardEyesInput = setupFormContainer.querySelector(`input[name="eyes-color"]`);
  var setupFireballColor = setupFormContainer.querySelector(`.setup-fireball-wrap`);
  var setupFireballColorInput = setupFormContainer.querySelector(`input[name="fireball-color"]`);
  var setupSimilar = setupFormContainer.querySelector(`.setup-similar`);

  var backendLoad = window.backend.load;
  var backendSave = window.backend.save;

  var setup = {};

  setup.setupFormContainer = setupFormContainer;
  setup.defaultTop = setupFormContainer.style.top;
  setup.defaultLeft = setupFormContainer.style.left;

  window.setup = setup;

  // var getWizardName = function () {
  //   var firstName = getRandomItem(WIZARD_FIRST_NAMES);
  //   var lastName = getRandomItem(WIZARD_LAST_NAMES);
  //   return `${firstName} ${lastName}`;
  // };

  var getCoatColor = function () {
    return getRandomItem(WIZARD_COAT_COLORS);
  };

  var getEyesColor = function () {
    return getRandomItem(WIZARD_EYES_COLORS);
  };

  // var getWizard = function () {
  //   return {
  //     name: getWizardName(),
  //     coatColor: getCoatColor(),
  //     eyesColor: getEyesColor()
  //   };
  // };

  // var getAllWizards = function () {
  //   var allWizards = [];
  //   for (var i = 0; i < 4; i++) {
  //     allWizards.push(getWizard());
  //   }
  //   return allWizards;
  // };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

    return wizardElement;
  };

  // var renderWizards = function (wizards) {
  //   var fragment = document.createDocumentFragment();
  //   wizards.forEach((wizard) => fragment.appendChild(renderWizard(wizard)));
  //   return fragment;
  // };

  // var drawWizards = function () {
  //   similarListElement.appendChild(backendLoad(getAllWizards()));
  // };

  // drawWizards();

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  backendLoad(successHandler, errorHandler);

  var showSetupPopup = function () {
    setupFormContainer.classList.remove(`hidden`);
    setupSimilar.classList.remove(`hidden`);
  };

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


  // setupFormContainer.addEventListener(`submit`, function (evt) {
  //   backendSave(new FormData(setupFormContainer), function () {
  //     userDialog.classList.add(`hidden`);
  //   });
  //   evt.preventDefault();
  // });

  var submitHandler = function (evt) {
    backendSave(
        new FormData(setupForm),
        function (_response) {
          setupFormContainer.classList.add(`hidden`);
        },
        errorHandler
    );
    evt.preventDefault();
  };

  setupForm.addEventListener(`submit`, submitHandler);

})();

