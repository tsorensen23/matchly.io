import React from 'react';
import Modal from 'react-modal';

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
    this.props.store.on('open-modal', function(payload) {
      this.setState({
        passedInfo: payload.visitors,
        school: payload.school,
        employer: payload.employer
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
    this.props.store.finishFuzzySchools.bind(this.props.store);
    this.setState({
      modalIsOpen: false
    });
  }
  handleFinish(e){
    e.preventDefault();
    this.props.store.finishFuzzySchools.bind(this.props.store);
    this.setState({
      modalIsOpen: false
    });
    delete this.props.store.possibleSchools[this.state.passedInfo];
    this.props.store.emit('check-state', this.state.passedInfo);
  }

  handleChange(e){
    this.props.store.doneWithSchool(this.state.passedInfo, e.target.value);
    console.log(this.props.store);
  }
  render() {
    if (this.state.visible) {
      if (this.state.school) {
        var selectOrNot;
        if(Array.isArray(this.props.store.possibleSchools[this.state.passedInfo])){
          selectOrNot =

              (
               <form onSubmit={this.handleFinish.bind(this)} >
                 <select
                  onChange={this.handleChange.bind(this)}
                  placeholder="Please Select an Option"  >
                  {
                    this.props.store.possibleSchools[this.state.passedInfo].map((e) => {
                      return (<option value={e}>{e}</option>);
                    })
                  }
                </select>
                <input type="submit" value="Submit" />
              </form>
              );
        } else {
          selectOrNot = <span>test</span>;
        }
        return (
          <div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal.bind(this)}
              style={customStyles}>
              {selectOrNot}
              <button
                onClick={this.closeModal.bind(this)}>
                  Save
              </button>
            </Modal>
          </div>
        );
      }
      if (this.state.employer) {
        return (
          <div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal.bind(this)}
              style={customStyles}>
              <select>
                {
                  this.props.store.possibleEmployers[this.state.passedInfo].map((e) => {
                    return (<option value={e}>{e}</option>);
                  })
                }
              </select>
              <button onClick={this.closeModal.bind(this)}>
                  Save
              </button>
            </Modal>
          </div>
        );
      }
    } else {
      return <p>hi</p>;
    }
  }
}

export default ImportTableBodyModalContent;
