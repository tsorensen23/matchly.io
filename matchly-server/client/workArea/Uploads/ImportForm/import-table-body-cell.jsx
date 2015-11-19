import React from 'react';

var green = 'green';
var red = 'red';
var yellow = 'yellow';
var white = 'white';

class ImportTableBodyCell extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      key: this.props.columnStore.starter,
      school: false,
      employer: false,
      backgroundColor: 'white'
    };
    this.props.store.on('set-headers', function() {
      var value;
      if(Object.keys(this.props.store.possibleEmployers).indexOf(this.props.visitor[this.state.key]) !== -1) {
        var passedEmployer = this.props.visitor[this.state.key];
        value = this.props.store.possibleEmployers[passedEmployer];
         if(typeof value == "object") {
           this.setState({backgroundColor: red});
         }
         if(Array.isArray(value)) {
           this.setState({backgroundColor: yellow});
         }
         if( typeof value === 'string') {
           this.setState({backgroundColor: green});
         }      
      }
      if (Object.keys(this.props.store.possibleSchools).indexOf(this.props.visitor[this.state.key]) !== -1) {
        var passedSchool = this.props.visitor[this.state.key];
        value = this.props.store.possibleSchools[passedSchool];
        if (typeof value == "object") {
          this.setState({backgroundColor: red});
        }
        if (Array.isArray(value)) {
          this.setState({backgroundColor: yellow});
        }
        if (typeof value === 'string') {
          this.setState({backgroundColor: green});
        }
      }
      var values = Object.keys(this.props.store.possibleEmployers).map(function(key){
        return this.props.store.possibleEmployers[key];
      }.bind(this));

      Object.keys(this.props.store.possibleSchools).forEach(function(key){
              values.push(this.props.store.possibleSchools[key]);
      }.bind(this));
      if (values.indexOf(this.props.visitor[this.state.key]) !== -1) {
        this.setState({backgroundColor: green});
      }
    }.bind(this));
    this.props.columnStore.on('is-school', function(e) {
      this.setState({
        school : true
      });
    }.bind(this));
    this.props.columnStore.on('is-employer', function(e) {
      this.setState({
        employer : true
      });
    }.bind(this));
  }
  fireModal() {
    if(this.state.school || this.state.employer){
    var payload = {
      visitors : this.props.visitor[this.state.key],
      school : this.state.school,
      employer : this.state.employer,
    };
    this.props.store.emit('open-modal', this);
    }
  }
  componentDidMount(){
    this.props.columnStore.on('change-value', function(newVal){
      this.setState({key: newVal});
    }.bind(this));
  }
  render() {
    return (
    <td style={{backgroundColor: this.state.backgroundColor, textAlign: 'center'}} onClick={this.fireModal.bind(this)}>
      {this.props.visitor[this.state.key]}
    </td>
    );
  }
}
export default ImportTableBodyCell;
