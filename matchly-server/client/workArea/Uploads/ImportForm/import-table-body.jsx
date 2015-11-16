import React from 'react';
import ImportTableBodyRow from './import-table-body-row.jsx';

class ImportTableBody extends React.Component {
  componentDidMount() {
    Object.keys(this.props.collumnStores).forEach(function(key){
      this.props.collumnStores[key].emit('finished');
    }.bind(this));
  }

  render(){
    return (
      <tbody>
      {this.props.store.rawData.map((visitor) => {
        return (<ImportTableBodyRow
                collumnStores={this.props.collumnStores}
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
