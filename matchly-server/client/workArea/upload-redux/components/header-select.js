import React from 'react';

export default class HeaderSelect extends React.Component {
  callChangeHeader(e) {
    this.props.changeHeader(this.props.header.needed, e.target.value);
  }
  render() {
    const { header, changeHeader, options } = this.props;
    var d = '';
      if(this.props.visitors.length) {
           d = (<ul>
              {this.props.visitors[0].data.map( (dataPoint, index) =>
                  (<li key={dataPoint + index}>{dataPoint}</li>)
              )}
            </ul>);
      }
    return (
      <div className="col-xs-2 header-fields">
        {header.needed.replace(/Class Visit Time/, 'Visit Time')}<br />
        <select
          onChange={this.callChangeHeader.bind(this)}
          value={header.given}
          style={{width: '100px'}}
        >
          <option value="Choose Field">Choose Field</option>
          {options.map((option, index) =>
            (<option key={index} value={option}>{option}</option>)
           )}
         </select>
         {d}
      </div>
    );
  }
}
