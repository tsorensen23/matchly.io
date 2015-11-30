import React from 'react';
import DataTableRow from './data-table-row';
import DataTableHeaderRow from './data-table-header-row';
import * as actions from '../../actions';

class DataTable extends React.Component{
  render() {
    return (
        <table>
          <thead>
            <DataTableHeaderRow headers={this.props.headers} visitor={this.props.finished[0]} />
          </thead>
          <tbody>
            {this.props.finished.map((e, index) =>
                (<DataTableRow
                 visitor={e}
                 key={e.First + e.Last}
                 allSchools={this.props.allSchools}
                 allEmployers={this.props.allEmployers}
                 employerMatches={this.props.employerMatches}
                 schoolMatches={this.props.schoolMatches}
                 changeValue={this.props.changeValue}
                 addNewAlias={this.props.addNewAlias}
                 />)
            )}
          </tbody>
        </table>
      );


  }
}
export default DataTable;
