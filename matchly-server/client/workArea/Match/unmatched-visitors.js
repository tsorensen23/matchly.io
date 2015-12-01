import React from 'react';
import moment from 'moment';

export default class UnmatchedVisitors extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      destroy: false,
      visitors: { 
        loading: false, data: []
      }
    }
  }
  componentDidMount() {
    
    this.setState(Object.assign({}, this.state, {
      visitors: {
        loading: true
      }
    }));
    $.ajax({
      method: 'get',
      url: '/visitors',
      contentType: 'application/json',
      data: {date: this.props.date.toISOString()},
      success: function(data) {
        this.setState({visitors: { loading: false, data: data}})
      }.bind(this),
      always: function(){
      this.setState(Object.assign({}, this.state, {
        visitors: {
          loading: false
        }
      }));
      }.bind(this)
    });
  }
  deleteStuff(){
    $.ajax({
      method: 'post',
      url: '/deletevisitors',
      contentType: 'application/json',
      data: JSON.stringify({date: this.props.date}),
      success: function(data) {
        this.setState({ 
          destroy: true, 
          visitors: { 
            data: []}});
        console.log(data);
      }.bind(this)
    });
  }
  render() {
    if(this.state.destroy){
      return <div />
    }
    if(this.state.visitors.loading){
      return <h1>hi</h1>
    }
    if(this.state.visitors.data){
      return (
          <div>
          <button 
            onClick={this.deleteStuff.bind(this)}
            className="btn btn-danger"
          >
            Erase these visitors
          </button>
          <h3>Visitors</h3>

        <table className="table table condensed">
          <thead>
            <tr>
              <th>Name</th>
              <th>Visit Time</th>
            </tr>
          </thead>
          <tbody>

          {this.state.visitors.data.map((visitor, index) => {
            return(
                <tr key={visitor.Contact.Last + index}>
                  <td>
                    {visitor.Contact.First} {visitor.Contact.Last}
                  </td>
                  <td>
                    Visit Date: {moment(visitor.MatchInfo.visitDate).format('YYYY-MM-DD')}
                  </td>
                  </tr>
                );
          })}
      </tbody>
    </table>
    </div>
          )
    }
      return <h1>hi</h1>
  }
}

