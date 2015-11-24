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
              {this.props.visitors[0].data.map( dataPoint =>
                  (<li>{dataPoint}</li>)
              )}
            </ul>);
      }
    return (
        <div style={{display: 'inline-block'}}>
          needed:{header.needed}
          <br />
          <select onChange={this.callChangeHeader.bind(this)} value={header.given} >
            <option value="Please Select A Header">Please Select A Header</option>
            {options.map((option, index) =>
              (<option key={index} value={option}>{option}</option>)
             )}
           </select>
           {d}
         </div>
        );
  }
}
