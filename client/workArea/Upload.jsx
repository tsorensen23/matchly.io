var React = require('react');

var Upload = require('./Uploads/FirstEntry.jsx');
var ButtonList = require('./Uploads/ButtonList.jsx');
var SchoolPicker = require('./Uploads/SchoolPicker/index.jsx');
var DoubleCheck = require('./Uploads/DoubleCheck.jsx');
var Loading = require('./Loading.jsx');
var FieldsStore = require('../Stores/Fields-Data');

var IndustryPicker = require('./Uploads/IndustryPicker/index.jsx');
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

      store.on('ready-for-industry-fuzzy', function() {
        _this.setState({pageView: 3});
      });
      store.on('ready-for-confirmation', function() {
        _this.setState({pageView: 4});
      });

      store.on('finished', function() {
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
          store={this.state.store}
          possible={this.state.store.possibleSchools}
          individuals={this.state.store.individuals}
          possibleHandler={this.state.store.doneWithSchool.bind(this.state.store)}
        />;
      case 3: return <h1>Hi</h1>;
      case 4: return <DoubleCheck store={this.state.store} />;
      default: return <Loading />;
    };
  }
});

module.exports = UploadRouter;
