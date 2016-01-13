import React from 'react';
import DataCell from './data-cell';

class DataTableRow extends React.Component {
  render() {
    const { visitor } = this.props;
    return (
      <div className="row">
        {Object.keys(visitor).map((key, index) =>
          (<DataCell
            className="col-xs-1"
            key={visitor[key] + index}
            employerMatches={this.props.employerMatches}
            schoolMatches={this.props.schoolMatches}
            data={visitor[key]}
            allSchools={this.props.allSchools}
            allEmployers={this.props.allEmployers}
            dataKey={key}
            addNewAlias={this.props.addNewAlias}
            changeValue={this.props.changeValue}
           />)
        )}
      </div>
    );
  }
}
export default DataTableRow;
