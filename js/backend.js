/* eslint-disable no-var */
'use strict';

(function () {
  var URL_LOAD = `https://21.javascript.pages.academy/code-and-magick/data`;
  var URL_SAVE = `https://21.javascript.pages.academy/code-and-magick`;

  var TIMEOUT_IN_MS = 10000;

  var StatusCode = {
    OK: 200
  };


  var backend = {};

  var createRequestObject = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  backend.load = function (onLoad, onError) {
    var xhr = createRequestObject(onLoad, onError);

    xhr.open(`GET`, URL_LOAD);
    xhr.send();
  };

  backend.save = function (data, onLoad, onError) {
    var xhr = createRequestObject(onLoad, onError);

    xhr.open(`POST`, URL_SAVE);
    xhr.send(data);
  };

  window.backend = backend;
})();
