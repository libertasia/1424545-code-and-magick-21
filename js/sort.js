/* eslint-disable no-var */
'use strict';

(function () {
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
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    renderWizards(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  onEyesChange(window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  })
  );

  onCoatChange(window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  })
  );

  var onLoadCallback = function (data) {
    wizards = data;
    updateWizards();
  };

  backendLoad(onLoadCallback, onErrorCallback);
})();
