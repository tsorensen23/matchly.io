import React from 'react';
import Modal from 'react-modal';
var TypeAheadWrapper = require('../EmployerPicker/noValue.jsx');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class ImportTableBodyModalContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      visible : false,
      passedInfo : '',
    };
    this.props.store.on('open-modal', function(cell) {
      this.tableCell = cell;
      this.setState({
        passedInfo: cell.props.visitor[cell.state.key],
        school: cell.state.school,
        employer: cell.state.employer
      });
      this.openModal();
    }.bind(this));
  }
  openModal() {
    this.setState({
      modalIsOpen: true,
      visible: true
    });
  }
  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }
  handleFinish(e){
    e.preventDefault();
    this.props.store.emit('set-headers', this.state.passedInfo);
    this.props.store.emit('visitor-update', this.props.store.rawData);
    this.setState({
      modalIsOpen: false
    });

  }
  handleChange(e){
    if (this.state.school) {
      this.props.store.doneWithSchool(this.state.passedInfo, e.target.value);
    }
    if (this.state.employer) {
      this.props.store.doneWithEmployer(this.state.passedInfo, e.target.value);
    }
  }
  render() {
    if (this.state.visible) {
      if (this.state.school) {
        var key = 'possibleSchools';
      } else {
        var key = 'possibleEmployers';
      }
        if(Array.isArray(this.props.store[key][this.state.passedInfo])) {
        return (
          <div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal.bind(this)}
              style={customStyles}>
               <form onSubmit={this.handleFinish.bind(this)} >
                 <select
                  onChange={this.handleChange.bind(this)}
                  placeholder="Please Select an Option"  >
                  {
                    this.props.store[key][this.state.passedInfo].map((e) => {
                      return (<option value={e}>{e}</option>);
                    })
                  }
                </select>
                <input type="submit" value="Submit" />
              </form>
              <button
                onClick={this.closeModal.bind(this)}>
                  Save
              </button>
            </Modal>
          </div>
        );
      } else {
        return (
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal.bind(this)}
            style={customStyles}>
            <form onSubmit={this.handleFinish.bind(this)} >
              {(function() {
                if(this.state.employer) {
                return(
                <TypeAheadWrapper
                  schools={this.props.store.availableEmployers}
                  possibleHandler={this.props.store.doneWithEmployer.bind(this.props.store)}
                  name={this.state.passedInfo}
                />);
              }
              if(this.state.school){
                return(
                <TypeAheadWrapper
                  schools={this.props.store.availableSchools}
                  possibleHandler={this.props.store.doneWithSchool.bind(this.props.store)}
                  name={this.state.passedInfo}
                />);
              }
            }.bind(this))()}

              <input type="submit" value="Submit" />
            </form>
	         </Modal>
	        );
      }
    } else {
      return <p style={{display: 'none'}}>hi</p>;
    }
  }
}

export default ImportTableBodyModalContent;
