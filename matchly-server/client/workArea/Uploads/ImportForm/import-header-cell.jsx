import React from 'react';
import ImportHeaderTitle from './import-header-title.jsx';
import ImportHeaderSelect from './import-header-select.jsx';
import FormStore from './FormStore.js';

class ImportHeaderCell extends React.Component {
  constructor(props){
    super(props);
    this.state = {headerSet: false};
    this.localStore = new FormStore();
    this.localStore.setMaxListeners(0);
  }
  componentDidMount(){
    this.localStore.on('finished-header', function(){
      this.setState({headerSet: true});
    }.bind(this));
  }
  render(){
    return (
      <td style={{ border: '3px solid', borderColor: this.state.headerSet ? 'green' : 'tomato'}}>
        <ImportHeaderTitle
          collumnStores={this.props.collumnStores}
          localStore={this.localStore}
          store={this.props.store}
          title={this.props.title}
        />
        <ImportHeaderSelect
          collumnStores={this.props.collumnStores}
          localStore={this.localStore}
          index={this.props.index}
          store={this.props.store}
          title={this.props.title}
        />
      </td>);
  }
}

export default ImportHeaderCell;
