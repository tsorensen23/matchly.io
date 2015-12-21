import React from 'react';

export default class DataTableHeaderRow extends React.Component {
  render() {
    return (
          <thead>
            <tr>
              {Object.keys(this.props.visitor).map(key => {
                if(key === 'Class Visit Time'){
                  key = 'Visit Time';
                }

                  return (<th key={key}>{key}</th>)
                                                          })}
            </tr>
          </thead>
        );
  }
}


