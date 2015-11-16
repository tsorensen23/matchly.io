import React from 'react';

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
      if  (Object.keys(this.props.store.possibleEmployers).indexOf(this.props.visitor[this.state.key]) !== -1) {
        var passedEmployer = this.props.visitor[this.state.key];
        var value = this.props.store.possibleEmployers[passedEmployer];
        if (typeof value === 'string') {
          this.setState({backgroundColor: 'green'});
        } else if (Array.isArray(value)) {
          this.setState({backgroundColor: 'yellow'});
        } else {
          this.setState({backgroundColor: 'red'});
        }
      }
      if (Object.keys(this.props.store.possibleSchools).indexOf(this.props.visitor[this.state.key]) !== -1) {
        var passedSchool = this.props.visitor[this.state.key];
        var value = this.props.store.possibleSchools[passedSchool];
        if (typeof value === 'string') {
          this.setState({backgroundColor: 'green'});
        } else if (Array.isArray(value)) {
          this.setState({backgroundColor: 'yellow'});
        } else {
          this.setState({backgroundColor: 'red'});
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
  }
  fireModal() {
    var payload = {
      visitors : this.props.visitor[this.state.key],
      school : this.state.school,
      employer : this.state.employer,
    };
    this.props.store.emit('open-modal', payload);
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
