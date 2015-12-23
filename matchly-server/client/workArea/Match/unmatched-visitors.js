import React from 'react';
import moment from 'moment';

export default class UnmatchedVisitors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      destroy: false,
      visitors: {
        loading: false,
        data: []
      }
    }
  }
  render() {
    if(this.state.destroy) {
      return <div/>
    }
    if(this.state.visitors.loading) {
      return <div/>
    }
    if(this.props.visitors.data) {
      return(
        <div>
          <div>
            <div>
              <button 
                onClick = {this.props.deleteVisitors}
                className="btn btn-danger pull-right"
                style={
                  {
                  marginTop: '20',
                  display: "block",
                  clear: 'both'
                }
              }>
                Erase these visitors
              </button>
            </div>
            <h3 style={
              {
                display: "inline-block"
              }
            }>
              Visitors
            </h3>
          </div>


        <table className="table table-condensed">
          <thead>
            <tr>
              <th> Name </th>
              <th> Visit Time </th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.visitors.data.map((visitor, index) => {
                return(
                  <tr key={
                    visitor.Contact.Last + index
                  }>
                    <td> {
                      visitor.Contact.First
                    } {
                      visitor.Contact.Last
                    } </td> <td> {
                      visitor.MatchInfo['Class Visit Time']
                    } </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>

        </div>
      )
    }
    return <div> </div>
  }
}
