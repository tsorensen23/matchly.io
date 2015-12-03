import React from 'react';
import HeaderSelect from './header-select';

export default class HeaderMatcher extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      stage: 1
    };
  }
  render() {
    switch(this.state.stage){
      case 1:
    return (
      <div
        className="clearfix"
        style={{marginTop: '20'}}
      >
        {this.props.headers.slice(0,6).map((header, index) =>
          (<HeaderSelect
            options={this.props.options}
            header={header}
            visitors={
              this.props.visitors.filter(e => e.key === header.given)
            }
            changeHeader={this.props.changeHeader}
          />)
        )}
            <div
              className="col-xs-12 text-center"
              style={{margin: '20px 0'}}
            >
              <button
                className="btn btn-success btn-lg col-xs-4 col-xs-offset-4"
                onClick={() => {
                this.setState({stage: 2});
                }}
              >
                Next
              </button>
            </div>
      </div>
    );
      case 2:
    return (
      <div
        className="clearfix"
        style={{marginTop: '20'}}
      >
        {this.props.headers.slice(6, this.props.headers.length).map((header, index) =>
          (<HeaderSelect
            options={this.props.options}
            header={header}
            display="Submit"
            visitors={
              this.props.visitors.filter(e => e.key === header.given)
            }
            changeHeader={this.props.changeHeader}
          />)
        )}
            <div
              className="col-xs-12 text-center"
              style={{margin: '20px 0'}}
            >
              <button
                className="btn btn-success btn-lg col-xs-4 col-xs-offset-4"
                onClick={this.props.onFinish}
              >
                Finish
              </button>
            </div>
      </div>
    );



    }

  }
}
