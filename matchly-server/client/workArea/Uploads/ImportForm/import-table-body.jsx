import React from 'react';
import ImportTableBodyRow from './import-table-body-row.jsx';

class ImportTableBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawData : this.props.store.rawData
    }
    this.props.store.on('visitor-update', function() {
      this.setState({
        rawData: this.props.store.rawData
      });
    }.bind(this));
  }
  componentDidMount() {
    Object.keys(this.props.columnStores).forEach(function(key){
      this.props.columnStores[key].emit('finished');
    }.bind(this));
  }

  render(){
    return (
      <tbody>
      {this.state.rawData.map((visitor) => {
        return (<ImportTableBodyRow
                columnStores={this.props.columnStores}
                store={this.props.store}
                visitor={visitor}
               />
            );
       })}
      </tbody>
      );
  }
}

export default ImportTableBody;
