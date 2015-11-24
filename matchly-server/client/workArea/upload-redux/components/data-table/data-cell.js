
import React from 'react';
import Select from 'react-select';

class DataCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicked: false};
  }
  handleInput(e){
    this.props.changeValue(this.props.dataKey, this.props.data, e.target.value);
    this.state.clicked = !this.state.clicked;
  }
  render() {
    var color;
    var singleMatch;
    var multipleMatch;
    var noValue;
    var school;
    var employer;
    if(!this.props.employerMatches.isFetching){
      for (var i = 0, l = this.props.employerMatches.data.length; i < l; i++) {
        var v = this.props.employerMatches.data[i];
        if(v.alias === this.props.data){
          this.possibilities = v;
          var employer = true;
          if(v.singleMatch){
            singleMatch = true;
          }
          if(v.multipleMatch) {
            color = 'yellow';
            multipleMatch = true;
          }
          if(v.noValue) {
            color = 'red';
            noValue = true;
          }
        }
      }
    }
    if(!this.props.schoolMatches.isFetching){
      for (var i = 0, l = this.props.schoolMatches.data.length; i < l; i++) {
        var v = this.props.schoolMatches.data[i];
        if(v.alias === this.props.data){
          this.possibilities = v;
          var school = true;
          if(v.singleMatch){
            singleMatch = true;
          }
          if(v.multipleMatch) {
            color = 'yellow';
            multipleMatch = true;
          }
          if(v.noValue) {
            color = 'red';
            noValue = true;
          }
        }
      }
    }
    if(multipleMatch && this.state.clicked) {
      return (
          <Select 
            value={this.props.data} 
            onChange={this.handleInput.bind(this)} 
            ref="select" 
            multi={true}
            allowCreate={true}
            options={this.possibilities.value.map(e =>
                {value: e, label: e}
            )}          
          />
          );
    }
    if(noValue && this.state.clicked){
      return (
          <Select
            name={this.props.dataKey}
            value={this.props.data}
            options={



    return (
        <td
          style={{
            backgroundColor: color
          }}
          onClick={() =>
            this.setState({clicked: true})
          }
        >
          {this.props.data}
          </td>
        );
  }
}
export default DataCell;
