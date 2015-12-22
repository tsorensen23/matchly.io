import React from 'react';
import DataTableRow from './data-table-row';
import DataTableHeaderRow from './data-table-header-row';
import * as actions from '../../actions';

class DataTable extends React.Component{
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <DataTableHeaderRow headers={this.props.headers} visitor={this.props.finished[0]} />
            {this.props.finished.map((e, index) =>
              (<DataTableRow
                className="row"
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
          </div>
        </div>
      </div>
    );
  }
}
export default DataTable;
