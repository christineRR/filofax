var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./school');

var Filofax = require('../src/filofax');
var trace = new Filofax();
window.onerror = function (msg, url, line, column, err) {
  trace.shot(err);
  trace.dump();
}

ReactDOM.render(<App trace = {trace} />, document.getElementById('container'));
