var React = require('react');

var Upload = require('./Uploads/FirstEntry.jsx');
var ButtonList = require('./Uploads/ButtonList.jsx');
var SchoolPicker = require('./Uploads/SchoolPicker/index.jsx');
var DoubleCheck = require('./Uploads/DoubleCheck.jsx');
var Loading = require('./Loading.jsx');
var FieldsStore = require('../Stores/Fields-Data');
var EmployerPicker = require('./Uploads/EmployerPicker/index.jsx');
var ImportForm = require('./Uploads/ImportForm/index.jsx');
import UploadRedux from './upload-redux/index';
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
        _this.setState({pageView: 2 });
      });

      store.on('ready-for-employer-fuzzy', function() {
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
    return <UploadRedux />
  }
});

module.exports = UploadRouter;
