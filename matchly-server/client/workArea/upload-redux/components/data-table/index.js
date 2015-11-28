import React from 'react';
import DataTableRow from './data-table-row';
import DataTableHeaderRow from './data-table-header-row';
import * as actions from '../../actions';

class DataTable extends React.Component{
  render() {
    return (
        <div>
          <table>
            <DataTableHeaderRow visitor={this.props.finished[0]} />
            {this.props.finished.map((e, index) =>
                (<DataTableRow
                 visitor={e}
                 key={e + index}
                 allSchools={this.props.allSchools}
                 allEmployers={this.props.allEmployers}
                 employerMatches={this.props.employerMatches}
                 schoolMatches={this.props.schoolMatches}
                 changeValue={this.props.changeValue}
                 addNewAlias={this.props.addNewAlias}
                 />)
            )}
          </table>
          <button
            onClick={() => {
              this.props.getEmployers();
              this.props.getSchools();
            }}
          >
            Click this
          </button>
        </div>
      );


  }
}
export default DataTable;
