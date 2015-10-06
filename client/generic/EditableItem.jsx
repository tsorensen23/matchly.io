
var React = require('react');
var mpath = require('mpath');

module.exports = React.createClass({
  getInitialState: function() {
    return {editing:false};
  },

  startModifying: function() {
    this.setState({editing:true});
  },

  modifyInput: function(event) {
    console.log(event.target.value);
    mpath.set(this.props.name, event.target.value, this.props.object);
  },

  stopModifying: function() {
    this.setState({editing:false});
  },

  render: function() {
    if (!this.state.editing) {
      return <div onClick={this.startModifying}>{mpath.get(this.props.name, this.props.object)}</div>;
    }

    return (<input
      type='text'
      onChange={this.modifyInput}
      onBlur={this.stopModifying}
      defaultValue={mpath.get(this.props.name, this.props.object)}
    />);
  },
});
