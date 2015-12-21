import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
  render() {
    const { display } = this.props;
    return (
        <div className="row">
          <div className="col-sm-12 text-center">
            <h3>
              These People were missing {display}
            </h3>
          </div>
        </div>

    );
  }
}

Header.propTypes = {
  display: PropTypes.string.isRequired
};
Header.defaultProps = {};
