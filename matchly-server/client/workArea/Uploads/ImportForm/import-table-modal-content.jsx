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
      <ImportTableBodyModalContent />
      this.setState({
        passedInfo : payload.visitors,
        school : payload.school,
        employer : payload.employer
      });
      this.openModal();
    }.bind(this));
  }
  openModal() {
    this.setState({
      modalIsOpen : true,
      visible : true,
    });
  }
  closeModal() {
    this.setState({
      modalIsOpen : false
    });
  }
  render() {
    if (this.state.visible) {
      if (this.state.school) {
        return(
          <div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal.bind(this)}
              style={customStyles}>
              <select>
                {
                  this.props.store.possibleSchools[this.state.passedInfo].map((e) => {
                    return (<option value={e}>{e}</option>);
                  })
                }
              </select>
              <button
                onClick={this.closeModal.bind(this)}>
                  Save
              </button>
            </Modal>
          </div>
        );
      }
      if (this.state.employer) {
        return(
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
              <button
                onClick={this.closeModal.bind(this)}>
                  Save
              </button>
            </Modal>
          </div>
        );
      }
    } else {
      return <p></p>
    }
  }
}

export default ImportTableBodyModalContent;
