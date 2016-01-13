import React from 'react';

export default class DataTableHeaderRow extends React.Component {
  render() {
    return (
      <div className="row">
        {Object.keys(this.props.visitor).map(key => {
          if(key === 'Class Visit Time'){
            key = 'Visit Time';
          }
          return (
            <div
             style={{fontWeight: 500}}
             className="col-xs-1"
             key={key}>
              {key}
            </div>
          )
        })}
      </div>
    );
  }
}
