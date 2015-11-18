import React from 'react';
import ImportTableBodyCell from './import-table-body-cell.jsx';

class ImportTableBodyRow extends React.Component{
  render(){
    return (
    <tr>
    {Object.keys(this.props.store.matched).map((v, index) => {
      return (<ImportTableBodyCell
                columnStore={this.props.columnStores[v]}
                store={this.props.store}
                visitor={this.props.visitor}
              />);
     })}
    </tr>
    );

  }
}
export default ImportTableBodyRow;
