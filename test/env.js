"use strict";
var jsdom = require('jsdom');

jsdom.env({
  html: '<!doctype html><html><body></body></html>',
  created: function (err, window) {
    if (err) {
      return console.log('jsdom env error', err);
    }

    // mock performance.now
    window.performance = {
      now: function() {
        // hack with nodejs, [秒，纳秒]
        var arr = process.hrtime();
        var time = arr[0] * 1000 + arr[1]/1000000;
        return time;
      }
    }

    // A super simple DOM ready for React to render into
    // Store this DOM and the window in global scope ready for React to access
    global.window = window;
    global.document = window.document;
    // take all properties of the window object and also attach it to the 
    // mocha global object
    propagateToGlobal(window);
    console.log('------ env has load! ------');
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

