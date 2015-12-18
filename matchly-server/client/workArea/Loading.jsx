var React = require('react');

var Loading = React.createClass({
  render:function() {
    return (
      <div className='loading'>
        <div id='loading' style={{width: '50', height: '50', margin: '20px auto'}}>
          <img src='assets/loading.gif' alt='Match Loading...' />
        </div>
      </div>
    );
  }
});

module.exports = Loading;
