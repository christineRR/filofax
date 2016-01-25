var React = require('react');
var Fruit = require('./fruit');

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Fruit type="苹果" count='30' />
        <Fruit type="梨" count='10' />
      </div>
    );
  }
}

module.exports = App;
