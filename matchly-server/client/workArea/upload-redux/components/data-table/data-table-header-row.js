import React from 'react';

export default class DataTableHeaderRow extends React.Component {
  render() {
    return (
          <thead>
            <tr>
              {Object.keys(this.props.visitor).map(key =>
                  (<th key={key}>{key}</th>)
              )}
            </tr>
          </thead>
        );
  }
}


