import React from 'react';

export default class DataTableHeaderRow extends React.Component {
  render() {
    return (
          <thead>
            <tr>
            <th>Sup</th>
              {Object.keys(this.props.visitor).map(key =>
                  (<th>{key}</th>)
              )}
            </tr>
          </thead>
        );
  }
}


