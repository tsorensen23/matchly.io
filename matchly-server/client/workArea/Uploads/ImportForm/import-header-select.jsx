import React from 'react';

class ImportHeaderSelect extends React.Component {
  constructor(props){
    super(props);
    this.state = {hitSave: false};
    this.props.collumnStores[this.props.title].starter = Object.keys(this.props.store.rawData[0])[this.props.index];
  }
  select(e) {
    this.props.store.matched[this.props.title] = {finished: true, userGiven: e.target.value};
    this.props.collumnStores[this.props.title].emit('change-value', e.target.value);
    this.setState({userGiven: e.target.value});
  }
  finished(e){
    this.props.localStore.emit('finished-header', this.state.userGiven);
    this.setState({hitSave: true});
  }
  reset(e){
    e.preventDefault();
    this.setState({hitSave: false});
  }
  render() {
    if(!this.state.hitSave){
    return (
        <div>
        <span style={{color: 'tomato'}}>(unmatched column)</span>
        <select defaultValue={Object.keys(this.props.store.rawData[0])[this.props.index]} onChange={this.select.bind(this)}>
          {Object.keys(this.props.store.rawData[0]).map((option, index) =>{
                  return (<option key={index} >{option}</option>);
            })}
        </select>
        <button onClick={this.finished.bind(this)} className="btn btn-primary">Save</button>
    </div>
    );
    }else {
      return (
      <div>
        <p>{this.props.store.matched[this.props.title]}</p>
        <button onClick={this.reset.bind(this)}>Edit</button>
      </div>
      );
    }
  }
}
export default ImportHeaderSelect;
