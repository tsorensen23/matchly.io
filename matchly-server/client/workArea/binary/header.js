import React, { Component, PropTypes } from 'react'

export default class Header extends Component {
  render() {
    const { display } = this.props;
    return (
        <h3>
          These People were missing {display}
        </h3>

    )
  }
}

Header.propTypes = {
  display: PropTypes.string.isRequired
}
Header.defaultProps = {}