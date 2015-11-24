import React from 'react';
import HeaderSelect from './header-select';

export default class HeaderMatcher extends React.Component {
  render() {
    return (
      <div>
        {this.props.headers.map((header, index) =>
        (<HeaderSelect
          options={this.props.options}
          header={header}
          key={index}
          visitors={this.props.visitors.filter(e => e.key === header.given)}
          changeHeader={this.props.changeHeader}
          changeKey={this.props.changeKey}
        />)
      )}
    </div>
    );

  }
}
