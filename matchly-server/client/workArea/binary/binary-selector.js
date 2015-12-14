import React, { Component, PropTypes } from 'react'

export default class BinarySelector extends Component {
  submit(e) {
    e.preventDefault();
    var form = e.target;

    if(form.elements.Gender.value !== ""){
      this.props.selector(form.elements.Gender.value)
    }
  }
  render() {
    const {options, name } = this.props;
    return (
        <div>
          <h3>Select a {name}</h3>
          <form onSubmit={this.submit.bind(this)}>
            {options.map((option, index) => {
              return (
                <p>
                  <input 
                    ref={name}
                    id={name+index}
                    name={name}
                    type='radio'
                    value={option}
                  />
                  <label
                    htmlFor={name + index}
                  >
                    {option}
                  </label>
                </p>
                );

            })}
            <button 
            >
              Submit
            </button>
          </form>
          <h3>Or 
            <button 
              onClick={() => {
                this.props.selector('N/A')
              }}
            >
              Skip
            </button>
          </h3>
        </div>

    )
  }
}

BinarySelector.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
}
BinarySelector.defaultProps = {}
