import React, { Component, PropTypes } from 'react';

export default class BinarySelector extends Component {
  submit(e) {
    e.preventDefault();
    var form = e.target;

    if(form.elements[this.props.name].value !== ""){
      this.props.selector(form.elements[this.props.name].value);
    }
  }
  render() {
    const {options, name } = this.props;
    return (
        <div className="col-sm-4">
          <h3>Select a {name}</h3>
          <form onSubmit={this.submit.bind(this)}>
            {options.map((option, index) => {
              return (
                <div className="radio">
                  <input
                    ref={name}
                    id={name + index}
                    name={name}
                    type='radio'
                    value={option}
                  />
                  <label
                    htmlFor={name + index}
                  >
                    {option}
                  </label>
                </div>
                );

            })}
            <button
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
          <h3>Or
            <button
              onClick={() => {
                this.props.selector('N/A');
              }}
            >
              Skip
            </button>
          </h3>
        </div>
    );
  }
}

BinarySelector.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};
BinarySelector.defaultProps = {};
