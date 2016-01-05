import React from 'react';

export default class Selector extends React.Component {
  render() {
    return (
    <select
      style={{
        width: 100
      }}
      onChange={(e) => {
              this.props.select(e.target.value);
      }}
    >
      {[1, 2, 3].map(num => {
      return (
          <option
            value={num}
           >
             {num}
           </option>
          );
      })}
    </select>
    );

  }
}
