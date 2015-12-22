import React from 'react';

export default class DataTableHeaderRow extends React.Component {
  render() {
    return (
      <div className="col-xs-12">
        {Object.keys(this.props.visitor).map(key => {
          if(key === 'Class Visit Time'){
            key = 'Visit Time';
          }
          return (
            <div
             style={{fontWeight: 500, whiteSpace: 'nowrap'}}
             className= {key === 'Employer' || key === 'Undergrad' ? "col-xs-2" : "col-xs-1"}
             key={key}>
              {key}
            </div>
          )
        })}
      </div>
    );
  }
}
