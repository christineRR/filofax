var React = require('react');
var Fruit = require('./fruit');

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    this.props.trace.shot({type: 'root'});
    return (
      <div>
        <Fruit trace = {this.props.trace} type="苹果" count='30' />
        <Fruit trace = {this.props.trace} type="梨" count='10' />
      </div>
    );
  }
}

module.exports = App;
