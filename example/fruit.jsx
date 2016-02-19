var React = require('react');

class Fruit extends React.Component {
  constructor(props) {
    super(props);
    var total = parseInt(props.count, 10);
    this.state = {eated:0, left: total, total: total};
    this.click = this.handleClick.bind(this);
  }

  handleClick(evt) {
    this.props.trace.rootShot();
    if(this.state.eated === this.state.total) {
      return;
    }
    this.setState({
      eated: this.state.eated + 1,
      left: this.state.left - 1
    });
  }

  render() {
    this.props.trace.shot();
    return (
      <div>
        <button onClick={this.click}>吃{this.props.type}</button>
        <h3>一共 {this.props.count} 个{this.props.type}，已经吃了 {this.state.eated} 个，还剩下 {this.state.left} 个。 </h3>
      </div>
    );
  }
}

module.exports = Fruit;
