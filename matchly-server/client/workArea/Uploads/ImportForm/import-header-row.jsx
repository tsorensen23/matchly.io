import React from 'react';
import FormStore from './FormStore.js';
import ImportHeaderCell from './import-header-cell.jsx';

class ImportHeader extends React.Component{
  constructor(props){
    super(props);
    this.state = { headerSet: false};
  }
  render(){
    return (
        <thead>
          <tr>
            {Object.keys(this.props.store.matched).map((key , index) =>{
              return (<ImportHeaderCell
                        key={key}
                        columnStores={this.props.columnStores}
                        store={this.props.store}
                        title={key}
                        index={index}
                      />);
            })}
          </tr>
        </thead>
        );
  }
}
export default ImportHeader;
