/* eslint-disable no-var */
'use strict';

(function () {
  var SHADOW_COLOR = `rgba(0, 0, 0, 0.7)`;
  var CLOUD_COLOR = `#fff`;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var SHADOW_X = CLOUD_X + GAP;
  var SHADOW_Y = CLOUD_Y + GAP;
  var OFFSET_LEFT = CLOUD_X + GAP * 2; // common left offset for all elements
  var TEXT_Y = CLOUD_Y + GAP * 2; // vertical coordinate for the first line of text
  var LINE_HEIGHT = 20;
  var BAR_GAP = 50;
  var BAR_WIDTH = 40;
  var BAR_MAX_HEIGHT = 150;
  var TextProps = {
    COLOR: `#000`,
    FONT: `16px PT Mono`,
    BASELINE: `hanging`
  };

  var drawRectangle = function (ctx, x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  var drawCloud = function (ctx, x, y) {
    drawRectangle(ctx, x, y, CLOUD_WIDTH, CLOUD_HEIGHT, CLOUD_COLOR);
  };

  var drawCloudShadow = function (ctx, x, y) {
    drawRectangle(ctx, x, y, CLOUD_WIDTH, CLOUD_HEIGHT, SHADOW_COLOR);
  };

  var getMaxElement = function (arr) {
    return Math.max.apply(null, arr);
  };

  var getBarHeight = function (time, maxTime) {
    return Math.round(time / maxTime * BAR_MAX_HEIGHT);
  };

  var getBarColor = function (name) {
    var yourColor = `rgba(255, 0, 0, 1)`;
    var othersColor = `hsl(240, ${100 * Math.random()}%, 50%)`;
    return name === `Вы` ? yourColor : othersColor;
  };

  var drawBar = function (ctx, x, y, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, BAR_WIDTH, -height);
  };

  var drawName = function (ctx, x, y, name) {
    ctx.fillStyle = TextProps.COLOR;
    ctx.fillText(name, x, y);
  };

  var drawTime = function (ctx, x, y, time) {
    time = Math.round(time);
    ctx.fillStyle = TextProps.COLOR;
    ctx.fillText(time, x, y);
  };

  var drawText = function (ctx, x, y, text) {
    ctx.fillStyle = TextProps.COLOR;
    ctx.font = TextProps.FONT;
    ctx.textBaseline = TextProps.BASELINE;
    var lines = text.split(`\n`);
    var lastLineY = y;
    for (var i = 0; i < lines.length; i++) {
      lastLineY = y + (i * LINE_HEIGHT);
      ctx.fillText(lines[i], x, lastLineY);
    }
  };

  var drawResult = function (ctx, x, y, name, time, maxTime) {
    var barHeight = getBarHeight(time, maxTime);
    var barColor = getBarColor(name);
    drawBar(ctx, x, y, barHeight, barColor);

    var nameY = y + GAP;
    drawName(ctx, x, nameY, name);

    var timeY = y - barHeight - 2 * GAP;
    drawTime(ctx, x, timeY, time);
  };

  var getTextHeight = function (text) {
    var lines = text.split(`\n`);
    return lines.length * LINE_HEIGHT;
  };

  window.renderStatistics = function (ctx, names, times) {
    var text = `Ура вы победили!\nСписок результатов:`;

    drawCloudShadow(ctx, SHADOW_X, SHADOW_Y);
    drawCloud(ctx, CLOUD_X, CLOUD_Y);
    drawText(ctx, OFFSET_LEFT, TEXT_Y, text);
    var lastLineY = TEXT_Y + getTextHeight(text);
    var maxTime = getMaxElement(times);

    for (var i = 0; i < names.length; i++) {
      var barX = OFFSET_LEFT + i * (BAR_WIDTH + BAR_GAP);
      var barY = lastLineY + GAP * 2 + BAR_MAX_HEIGHT;
      drawResult(ctx, barX, barY, names[i], times[i], maxTime);
    }
  };
})();
