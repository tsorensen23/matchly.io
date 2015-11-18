import React from 'react';
import ImportTableBodyRow from './import-table-body-row.jsx';

class ImportTableBody extends React.Component {
  componentDidMount() {
    Object.keys(this.props.columnStores).forEach(function(key){
      this.props.columnStores[key].emit('finished');
    }.bind(this));
  }

  render(){
    return (
      <tbody>
      {this.props.store.rawData.map((visitor) => {
        return (<ImportTableBodyRow
                columnStores={this.props.columnStores}
                store={this.props.store}
                visitor={visitor}
               />
            );
       })}
      </tbody>
      );
  }
}

export default ImportTableBody;
