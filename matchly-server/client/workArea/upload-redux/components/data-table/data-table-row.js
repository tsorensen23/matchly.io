import React from 'react';
import DataCell from './data-cell';

class DataTableRow extends React.Component {
  render() {
    const { visitor } = this.props;
    return (
        <tr>
          {Object.keys(visitor).map((key) =>
              (<DataCell
                employerMatches={this.props.employerMatches}
                schoolMatches={this.props.schoolMatches}
                data={visitor[key]}
                dataKey={key}
                changeValue={this.props.changeValue}
               />)
            )}
          </tr>
        );

  }
}
export default DataTableRow;
