import React from 'react';

class ImportTableBodyCell extends React.Component{
  constructor(props){
    super(props);
    this.state = {key: this.props.startKey};
  }
  componentDidMount(){
    this.props.collumnStore.on('change-value', function(newVal){
      console.log(newVal, 'event Emitter Fired');
      this.setState({key: newVal});
    }.bind(this));

  }
  render() {
    console.log(this.state.key, 'rendering a cell');
    return (
    <td  >{this.props.visitor[this.state.key]}</td>);
  }
}
export default ImportTableBodyCell;
