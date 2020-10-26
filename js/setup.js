/* eslint-disable no-var */
'use strict';

(function () {
  var WIZARD_COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  var WIZARD_EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
  var WIZARD_FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  var MAX_SIMILAR_WIZARD_COUNT = 4;

  var getRandomItem = window.util.getRandomItem;
  var onErrorCallback = window.backend.onErrorCallback;
  var backendSave = window.backend.save;

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

  var setup = {};

  var wizard = {
    onEyesChange() {},
    onCoatChange() {}
  };

  setup.setupFormContainer = setupFormContainer;
  setup.defaultTop = setupFormContainer.style.top;
  setup.defaultLeft = setupFormContainer.style.left;

  var getCoatColor = function () {
    return getRandomItem(WIZARD_COAT_COLORS);
  };

  var getEyesColor = function () {
    return getRandomItem(WIZARD_EYES_COLORS);
  };

  var renderWizard = function (wizardEl) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector(`.setup-similar-label`).textContent = wizardEl.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizardEl.colorCoat;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizardEl.colorEyes;

    return wizardElement;
  };

  setup.renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.innerHTML = ``;
    similarListElement.appendChild(fragment);
  };

  var showSetupPopup = function () {
    setupFormContainer.classList.remove(`hidden`);
    setupSimilar.classList.remove(`hidden`);
  };


  // Изменение цвета мантии персонажа по нажатию:

  var changeCoatColor = function () {
    var newColor = getCoatColor();
    setupWizardCoat.style.fill = newColor;
    setupWizardCoatInput.value = newColor;
    wizard.onCoatChange(newColor);
  };

  // Изменение цвета глаз персонажа по нажатию:

  var changeEyesColor = function () {
    var newColor = getEyesColor();
    setupWizardEyes.style.fill = newColor;
    setupWizardEyesInput.value = newColor;
    wizard.onEyesChange(newColor);
  };

  // Изменение цвета фаерболов по нажатию:

  var getFireballColor = function () {
    return getRandomItem(WIZARD_FIREBALL_COLORS);
  };

  var changeFireballColor = function () {
    setupFireballColor.style.backgroundColor = getFireballColor();
    setupFireballColorInput.value = getFireballColor();
  };

  // Отправка формы:

  var onUploadCallback = function () {
    setupFormContainer.classList.add(`hidden`);
  };

  var onSetupFormUpload = function (evt) {
    evt.preventDefault();
    var formData = new FormData(setupForm);
    backendSave(formData, onUploadCallback, onErrorCallback);
  };

  setupWizardCoat.addEventListener(`click`, changeCoatColor);
  setupWizardEyes.addEventListener(`click`, changeEyesColor);
  setupFireballColor.addEventListener(`click`, changeFireballColor);

  showSetupPopup();

  setupForm.addEventListener(`submit`, onSetupFormUpload);

  setup.onCoatChange = function (cb) {
    wizard.onCoatChange = cb;
  };

  setup.onEyesChange = function (cb) {
    wizard.onEyesChange = cb;
  };

  window.setup = setup;
})();

