var React = require('react');
import ImportHeaderRow from './import-header-row.jsx';
import ImportRow from './import-row.jsx';
import ImportTableBody from './import-table-body.jsx';
import {EventEmitter} from 'events';

class ImportForm extends React.Component{
  render(){
    var collumnStores = {};
    Object.keys(this.props.store.matched).forEach((k) => {
      collumnStores[k] = new EventEmitter();
      collumnStores[k].setMaxListeners(this.props.store.rawData.length);
    });
    console.log('collumnStores', collumnStores);
    return (
        <table>
          <ImportHeaderRow
            store={this.props.store}
            collumnStores={collumnStores}
          />
          <ImportTableBody
            store={this.props.store}
            collumnStores={collumnStores}
          />
        </table>);
  }
}
module.exports = ImportForm;

