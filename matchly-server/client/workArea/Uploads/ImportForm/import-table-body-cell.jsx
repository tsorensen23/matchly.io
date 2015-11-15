import React from 'react';

class ImportTableBodyCell extends React.Component{
  constructor(props){
    super(props);
    this.state = {key: this.props.collumnStore.starter};
  }
  componentDidMount(){
    this.props.collumnStore.on('change-value', function(newVal){
      this.setState({key: newVal});
    }.bind(this));

  }
  render() {
    console.log(this.state.key);
    return (
    <td>
      {this.props.visitor[this.state.key]}
    </td>
    );
  }
}
export default ImportTableBodyCell;
