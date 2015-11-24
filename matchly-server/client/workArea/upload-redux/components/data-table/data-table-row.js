import React from 'react';
import DataCell from './data-cell';

class DataTableRow extends React.Component {
  render() {
    const { visitor } = this.props;
    return (
        <tr>
          {Object.keys(visitor).map( key =>
              (<DataCell data={visitor[key]} />)
          )}
          </tr>
        );

  }
}
export default DataTableRow;
