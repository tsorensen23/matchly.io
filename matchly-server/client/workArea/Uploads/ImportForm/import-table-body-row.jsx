import React from 'react';
import ImportTableBodyCell from './import-table-body-cell.jsx';

class ImportTableBodyRow extends React.Component{
  render(){
    return (
    <tr>
    {Object.keys(this.props.store.matched).map((v) => {
      return (<ImportTableBodyCell
                startKey={'blah'}
                collumnStore={this.props.collumnStores[v]}
                visitor={this.props.visitor}
              />);
     })}
    </tr>
    );

  }
}
export default ImportTableBodyRow;
