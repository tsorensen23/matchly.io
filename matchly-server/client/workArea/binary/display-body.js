import React, { Component, PropTypes } from 'react'

export default class DisplayBody extends Component {
  render() {
    const {data } = this.props;
    return (
        <div>
          {data.map(visitor =>
              <p>{visitor.First + ' ' + visitor.Last}</p>
          )}
        </div>
    )
  }
}

DisplayBody.propTypes = {
  data: PropTypes.array.isRequired
}
DisplayBody.defaultProps = {}
