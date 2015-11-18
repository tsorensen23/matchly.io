import React from 'react';

var green = 'green';
var red = 'red';
var yellow = 'yellow';

class ImportTableBodyCell extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      key: this.props.collumnStore.starter,
      school: false,
      employer: false,
      backgroundColor: 'white'
    };
    this.props.store.on('set-headers', function() {
      console.log(this.props.store.possibleEmployers);
      if(Object.keys(this.props.store.possibleEmployers).indexOf(this.props.visitor[this.state.key]) !== -1) {
        var passedEmployer = this.props.visitor[this.state.key];
        var value = this.props.store.possibleEmployers[passedEmployer];
         if(Array.isArray(value)) {
           this.setState({backgroundColor: yellow});
         }
         if(value === null) {
           this.setState({backgroundColor: red});
         } else {
           this.setState({backgroundColor: green});
         }
      }
      if (Object.keys(this.props.store.possibleSchools).indexOf(this.props.visitor[this.state.key]) !== -1) {
        var passedSchool = this.props.visitor[this.state.key];
        var value = this.props.store.possibleSchools[passedSchool];
        if (Array.isArray(value)) {
          this.setState({backgroundColor: yellow});
        }
        if (value === null) {
          this.setState({backgroundColor: red});
        } else {
          this.setState({backgroundColor: green});
        }
      }
    }.bind(this));
    this.props.collumnStore.on('is-school', function(e) {
      this.setState({
        school : true
      });
    }.bind(this));
    this.props.collumnStore.on('is-employer', function(e) {
      this.setState({
        employer : true
      });
    }.bind(this));
    this.props.store.on('visitor-update', function() {
      if(Object.keys(this.props.store.possibleEmployers).indexOf(this.props.visitor[this.state.key]) !== -1) {
        var passedEmployer = this.props.visitor[this.state.key];
        var value = this.props.store.possibleEmployers[passedEmployer];
         if(Array.isArray(value)) {
           this.setState({backgroundColor: yellow});
         }
         if(value === null) {
           console.log(this.props.store.possibleEmployers)
           console.log(value);
           console.log(passedEmployer);
           this.setState({backgroundColor: red});
         } else {
           this.setState({backgroundColor: green});
         }
      }
      if (Object.keys(this.props.store.possibleSchools).indexOf(this.props.visitor[this.state.key]) !== -1) {
        var passedSchool = this.props.visitor[this.state.key];
        var value = this.props.store.possibleSchools[passedSchool];
        if (Array.isArray(value)) {
          this.setState({backgroundColor: yellow});
        }
        if (value === null) {
          this.setState({backgroundColor: red});
        } else {
          this.setState({backgroundColor: green});
        }
      }
    }.bind(this));
  }
  fireModal() {
    var payload = {
      visitors : this.props.visitor[this.state.key],
      school : this.state.school,
      employer : this.state.employer,
    };
    this.props.store.emit('open-modal', this);
  }
  componentDidMount(){
    this.props.collumnStore.on('change-value', function(newVal){
      this.setState({key: newVal});
    }.bind(this));
  }
  render() {
    return (
    <td style={{backgroundColor: this.state.backgroundColor}} onClick={this.fireModal.bind(this)}>
      {this.props.visitor[this.state.key]}
    </td>
    );
  }
}
export default ImportTableBodyCell;
