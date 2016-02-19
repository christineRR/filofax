var React = require('react');
var Fruit = require('./fruit');

var Filofax = require('../src/filofax');
var trace = new Filofax();
window.onerror = function (msg, url, line, column, err) {
  trace.shot(err);
  trace.dump();
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    trace.dump();
  }

  render() {
    trace.rootShot();
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>trace dump</button>
        <Fruit trace = {trace} type="苹果" count='30' />
        <Fruit trace = {trace} type="梨" count='10' />
      </div>
    );
  }
}

module.exports = App;
