import React from 'react';

class ImportHeaderTitle extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return <p>{this.props.title}</p>;
  }
}
export default ImportHeaderTitle;
