var React = require('react');
import ImportHeader from './import-header-row.jsx';
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
    var columnStores = {};
    Object.keys(this.props.store.matched).forEach((k) => {
      columnStores[k] = new EventEmitter();
      columnStores[k].setMaxListeners(0);
    });
    return (
        <div>
          <table className="table table-condensed">
            <ImportHeader
              store={this.props.store}
              columnStores={columnStores}
            />
            <ImportTableBody
              store={this.props.store}
              columnStores={columnStores}
            />
          </table>
          <p className="text-center">
            <button
              style={{marginRight: '10px'}}
              className="btn btn-success btn-lg"
              onClick={this.logger.bind(this)}>
              Done
            </button>
            <button className="btn btn-danger btn-lg" onClick={this.handleshit.bind(this)}>Mega button</button>
          </p>
          <ImportTableBodyModalContent
            store={this.props.store}
          />
        </div>);
  }
}
module.exports = ImportForm;