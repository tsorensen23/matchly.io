import React from 'react';
import Select from 'react-select';

class DataCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicked: false};
    this.employer = false;
    this.school = false;
  }
  handleInput(e){
    this.props.changeValue(this.props.dataKey, this.props.data, e);
    if(this.possibilities.value === null || this.possibilities.value.indexOf(e) === -1){
      this.props.addNewAlias(this.props.data, e, this.props.dataKey === 'Employer');
    }
    this.state.clicked = !this.state.clicked;
  }
  render() {

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
          this.employer = true;
          if(v.singleMatch){
            this.color = 'white';
            singleMatch = true;
          }
          if(v.multipleMatch) {
            this.color = 'yellow';
            multipleMatch = true;
          }
          if(v.noValue) {
            this.color = 'red';
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
          this.school = true;
          if(v.singleMatch){
            this.color = 'white';
            singleMatch = true;
          }
          if(v.multipleMatch) {
            this.color = 'yellow';
            multipleMatch = true;
          }
          if(v.noValue) {
            this.color = 'red';
            noValue = true;
          }
        }
      }
    }
    if(multipleMatch && this.state.clicked) {
      return (
        <div
          style={{height: 20, overflow: 'hidden'}}>
          <b>{this.props.data}</b>
          <Select
            style={{width: 100}}
            value=""
            onChange={this.handleInput.bind(this)}
            ref="select"
            allowCreate={true}
            placeholder="Select..."
            options={this.possibilities.value.map(e => {
                return {value: e, label: e};
            })}
          />
        </div>
      );
    }
    if(noValue && this.state.clicked){
      var options = this.school ? this.props.allSchools.data : this.props.allEmployers.data;
      return (
        <div className="col-xs-1">
          <b>{this.props.data}</b>
          <Select
            value=""
            onChange={this.handleInput.bind(this)}
            ref="select"
            allowCreate={true}
            placeholder="Select..."
            options={options.map(e =>{
                return {value: e, label: e};
            })}
          />
        </div>
      );
    }
    return (
      <div
        className= {this.props.dataKey === 'Employer' || this.props.dataKey === 'Undergrad' ? "col-xs-2" : "col-xs-1"}
        style={{
          backgroundColor: this.color
        }}
        onClick={() =>
          this.setState({clicked: true})
        }
      >
        {this.props.data}
      </div>
    );
  }
}
export default DataCell;
