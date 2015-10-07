var React = require('react');

var Upload = require('./Uploads/FirstEntry.jsx');
var ButtonList = require('./Uploads/ButtonList.jsx');
var SchoolPicker = require('./SchoolPicker.jsx');
var DoubleCheck = require('./Uploads/DoubleCheck.jsx');

var FieldsStore = require('../Stores/Fields-Data');

var UploadRouter = React.createClass({
  getInitialState: function() {
    return {
      store: void 0,
      pageView: 0
    };
  },

  componentWillMount: function() {
    var _this = this;
    FieldsStore.on('new-Store', function(store) {
      _this.setState({store: store, pageView: -1});
      store.on('please-wait', function() {
        _this.setState({pageView: -1});
      });

      store.on('ready-for-header', function() {
        _this.setState({pageView: 1});
      });

      store.on('ready-for-fuzzy', function() {
        _this.setState({pageView: 2});
      });

      store.on('ready-for-confirmation', function() {
        _this.setState({pageView: 3});
      });

      store.on('finish', function() {
        console.log('finish stor');
        alert('finish');
        _this.setState({pageView: 0, store: void 0});
      });

    });
  },

  render: function() {
    switch (this.state.pageView) {
      case 0: return <Upload Store={FieldsStore}/>;
      case 1: return <ButtonList store={this.state.store}/>;
      case 2: return <SchoolPicker
          possible={this.state.store.possible}
          possibleHandler={this.state.store.doneWithSchool.bind(this.state.store)}
        />;
      case 3: return <DoubleCheck store={this.state.store} />;
      default: return <img href='/assets/loading.gif' />;
    };
  }
});

module.exports = UploadRouter;
