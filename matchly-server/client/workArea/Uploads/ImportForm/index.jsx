var React = require('react');
import ImportHeaderRow from './import-header-row.jsx';
import ImportRow from './import-row.jsx';
import ImportTableBody from './import-table-body.jsx';
import {EventEmitter} from 'events';

class ImportForm extends React.Component{
  logger() {
    this.props.store.confirmHeaders();
  }
  render(){
    console.log(this.props.store.getStaticKeys());
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
          <button className="btn btn-success" onClick={this.logger.bind(this)}>Done</button>
        </div>);
  }
}
module.exports = ImportForm;

