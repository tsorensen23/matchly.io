var React = require('react');

 var Button = React.createClass({
  getInitialState: function() {
    return({color: null, opacity: undefined});
  },
  handleClick: function(){
    // return the new color?
    this.setState({opacity: "1.0"});

    this.props.colorChange(this.props.index);
  },
  render: function() {
    var opacity = this.state.opacity || "0.9";
    return(
      <div>
        <button
          disabled={this.props.disabled}
          style={{
            backgroundColor: this.props.color,
            color: "black",
            opacity: opacity,
            width: '200px',
            margin: '5px 0px'
          }}
          type="button"
          onClick={this.handleClick}
          className="btn" >
          {this.props.data}
        </button>
      </div>
      );
  }
 });
module.exports = Button;
