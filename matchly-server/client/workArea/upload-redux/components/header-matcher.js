import React from 'react';
import HeaderSelect from './header-select';

export default class HeaderMatcher extends React.Component {
  render() {
    return (
      <div
        className="clearfix"
        style={{marginTop: '20'}}
      >
        {this.props.headers.map((header, index) =>
          (<HeaderSelect
            options={this.props.options}
            header={header}
            visitors={
              this.props.visitors.filter(e => e.key === header.given)
            }
            changeHeader={this.props.changeHeader}
          />)
        )}
      </div>
    );

  }
}
