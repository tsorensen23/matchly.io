var React = require('react');
import ImportHeaderRow from './import-header-row.jsx';
import ImportRow from './import-row.jsx';
import ImportTableBody from './import-table-body.jsx';
import {EventEmitter} from 'events';
import Modal from 'react-modal';
import ImportTableBodyModalContent from './import-table-modal-content.jsx';



class ImportForm extends React.Component{
  constructor(props) {
    super(props);
    this.props.store.on('set-headers', function() {
    }.bind(this));
  }
  logger() {
    this.props.store.confirmHeaders();
  }
  handleshit(){
    this.props.store.emit('ready-for-confirmation');
  }
  render() {
    var collumnStores = {};
    Object.keys(this.props.store.matched).forEach((k) => {
      collumnStores[k] = new EventEmitter();
      collumnStores[k].setMaxListeners(this.props.store.rawData.length);
    });
    return (
        <div>
          <table>
            <ImportHeaderRow
              store={this.props.store}
              collumnStores={collumnStores}
            />
            <ImportTableBody
              store={this.props.store}
              collumnStores={collumnStores}
            />
          </table>
          <button
            className="btn btn-success"
            onClick={this.logger.bind(this)}>
            Done
          </button>
          <ImportTableBodyModalContent
            store={this.props.store}
          />
          <button className="btn btn-danger" onClick={this.handleshit.bind(this)}>Mega button</button>
        </div>);
  }
}
module.exports = ImportForm;
