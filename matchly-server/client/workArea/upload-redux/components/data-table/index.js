import React from 'react';
import DataTableRow from './data-table-row';
import DataTableHeaderRow from './data-table-header-row';

class DataTable extends React.Component{
  render() {
    return (
        <table>
          <DataTableHeaderRow visitor={this.props.finished[0]} />
          {this.props.finished.map(e =>
              (<DataTableRow visitor={e} />)
          )}
        </table>
      );


  }
}
export default DataTable;
