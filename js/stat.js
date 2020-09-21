/* eslint-disable no-var */
'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  if (arr.length === 0) {
    return 0;
  }
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var drawBar = function (ctx, x, y, name, time, maxTime) {
  ctx.fillStyle = name === 'Вы' ? 'rgba(255, 0, 0, 1)' : `hsl(240, ${100 * Math.random()}%, 50%)`;
  var height = Math.round(time / maxTime * BAR_MAX_HEIGHT);
  ctx.fillRect(x, y, BAR_WIDTH, -height);
  ctx.fillStyle = '#000';
  ctx.fillText(name, x, y + GAP);
  time = Math.round(time);
  ctx.fillText(time, x, y - height - GAP * 2);
};

var drawText = function (ctx, x, y, text) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  var lineHeight = 20;
  var lines = text.split('\n');
  var lastLineY = y;
  for (var i = 0; i < lines.length; i++) {
    lastLineY = y + (i * lineHeight);
    ctx.fillText(lines[i], x, lastLineY);
  }
  return lastLineY;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      'rgba(0, 0, 0, 0.7)'
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      '#fff'
  );

  var offsetLeft = CLOUD_X + GAP * 2;
  var firstLineY = CLOUD_Y + GAP * 2;
  var lastLineY = drawText(ctx, offsetLeft, firstLineY, 'Ура вы победили!\nСписок результатов:');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    drawBar(ctx, offsetLeft + i * (BAR_WIDTH + BAR_GAP), lastLineY + GAP * 4 + BAR_MAX_HEIGHT, names[i], times[i], maxTime);
  }
};

