"use strict";
var jsdom = require('jsdom');
var fs = require('fs');
var path = require('path');

// webpack common file for test
// var commonFile = path.join(__dirname, '../../out/test/static/common.js');
// var common = fs.readFileSync(commonFile, 'utf-8');

jsdom.env({
  html: '<!doctype html><html><body></body></html>',
  src:[],
  done: function (err, window) {
    if (err) {
      return console.log('jsdom env error', err);
    }

    // mock performance.now
    window.performance = {
      now: function() {
        return Math.random();
      }
    }

    // A super simple DOM ready for React to render into
    // Store this DOM and the window in global scope ready for React to access
    global.window = window;
    global.document = window.document;
    // take all properties of the window object and also attach it to the 
    // mocha global object
    propagateToGlobal(window);
  }
});

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = window[key]
  }
}

console.log('------ env has load! ------');
