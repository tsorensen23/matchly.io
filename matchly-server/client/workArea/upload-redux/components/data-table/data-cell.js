
import React from 'react';

class DataCell extends React.Component {
  render() {
    return (
        <td>
          {this.props.data}
          </td>
        );
  }
}
export default DataCell;
