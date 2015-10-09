var React = require('react');

var MultipleValueWrapper = React.createClass({
  logger: function(school) {
    var name = this.props.name;
    this.props.possibleHandler(name, school);
  },

  render: function() {
    return (
        <div>
        <b>{this.props.name} : {this.props.person}</b> <br />
          <div className="btn-group">
            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Select a School 
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
            {[
            ].concat(this.props.schools.map(function(school) {
              return <li><a onClick={this.logger.bind(this, school)} href="#">{school}</a></li>
            }.bind(this)))}
            </ul>
        </div>
      </div>
    );
  }
});

module.exports = MultipleValueWrapper;
