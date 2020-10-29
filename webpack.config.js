const path = require("path");

module.exports = {
  entry: [
    "./js/game.js",
    "./js/util.js",
    "./js/debounce.js",
    "./js/stat.js",
    "./js/backend.js",
    "./js/setup.js",
    "./js/sort.js",
    "./js/move.js",
    "./js/dialog.js",
    "./js/valid.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
