
var React = require('react');
var mpath = require('mpath');

module.exports = React.createClass({
  getInitialState: function() {
    return {editing:false};
  },

  startModifying: function() {
    this.setState({editing:true}, function(){
      $(ReactDOM.findDOMNode(this)).focus().select();
    });
  },

  modifyInput: function(event) {
    mpath.set(this.props.name, event.target.value, this.props.object);
  },

  stopModifying: function() {
    this.setState({editing:false});
  },
  logger: function(e){
    if(e.keyCode === 13 || e.keyCode == 27){
      this.stopModifying();
    } 
  },

  render: function() {
    var bgColor = 'inherit';
    var color = 'inherit';
    if(this.props.name === 'MatchInfo.Class Visit Time'){
      if(!/\d{0,2}\:?\d\d.*/.test(mpath.get(this.props.name, this.props.object)) || /.*\/.*/.test(mpath.get(this.props.name, this.props.object))){
        bgColor = '#C0392B';
        color = 'white';
      } 
    }
    if (!this.state.editing) {
      return <div style={{backgroundColor: bgColor, color: color}} onClick={this.startModifying}>{mpath.get(this.props.name, this.props.object)}</div>;
    }

    return (<input
      type='text'
      onChange={this.modifyInput}
      onBlur={this.stopModifying}
      onKeyDown={this.logger}
      defaultValue={mpath.get(this.props.name, this.props.object)}
    />);
  },
});
