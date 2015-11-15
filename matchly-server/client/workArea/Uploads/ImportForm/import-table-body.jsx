import React from 'react';
import ImportTableBodyRow from './import-table-body-row.jsx';

class ImportTableBody extends React.Component {
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
