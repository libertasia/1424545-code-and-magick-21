/* eslint-disable no-var */
'use strict';

var backendLoad = window.backend.load;
var onErrorCallback = window.backend.onErrorCallback;
var renderWizards = window.setup.renderWizards;
var onCoatChange = window.setup.onCoatChange;
var onEyesChange = window.setup.onEyesChange;

var coatColor = `rgb(101, 137, 164)`;
var eyesColor = `black`;
var wizards = [];

var getRank = function (wizard) {
  var rank = 0;

  if (wizard.colorCoat === coatColor) {
    rank += 2;
  }
  if (wizard.colorEyes === eyesColor) {
    rank += 1;
  }

  return rank;
};

var namesComparator = function (left, right) {
  if (left > right) {
    return 1;
  } else if (left < right) {
    return -1;
  }

  return 0;
};

var sortWizards = function (wizardsArray) {
  var sortedWizards = wizardsArray.sort(function (left, right) {
    var rankDiff = getRank(right) - getRank(left);
    if (rankDiff === 0) {
      rankDiff = namesComparator(left.name, right.name);
    }
    return rankDiff;
  });
  return sortedWizards;
};

onEyesChange(window.debounce(function (color) {
  eyesColor = color;
  renderWizards(sortWizards(wizards));
})
);

onCoatChange(window.debounce(function (color) {
  coatColor = color;
  renderWizards(sortWizards(wizards));
})
);

var onLoadCallback = function (data) {
  wizards = data.slice(0);
  renderWizards(sortWizards(wizards));
};

backendLoad(onLoadCallback, onErrorCallback);

