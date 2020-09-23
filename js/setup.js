/* eslint-disable no-var */
'use strict';

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var similarListElement = document.querySelector('.setup-similar-list');

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

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};

similarListElement.appendChild(renderWizards(getAllWizards()));
userDialog.querySelector('.setup-similar').classList.remove('hidden');
