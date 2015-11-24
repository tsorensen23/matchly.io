import React from 'react';

class ImportHeaderSelect extends React.Component {
  constructor(props){
    super(props);
    this.state = {hitSave: false};
    this.props.columnStores[this.props.title].starter = Object.keys(this.props.store.rawData[0])[this.props.index];
    this.props.columnStores[this.props.title].on('finished', function() {
      this.props.columnStores[this.props.title].emit('change-value', this.props.store.matched[this.props.title]);
    }.bind(this));
  }
  select(e) {
    this.props.store.matched[this.props.title] = e.target.value;
    this.props.columnStores[this.props.title].emit('change-value', e.target.value);
    this.setState({userGiven: e.target.value});
  }
  finished(e){
    this.props.localStore.emit('finished-header', this.state.userGiven);
    if (this.props.title === 'Undergrad') {
      this.props.columnStores[this.props.title].emit('is-school');
    }
    if (this.props.title === 'Employer') {
      this.props.columnStores[this.props.title].emit('is-employer');
    }
    this.setState({hitSave: true});
  }
  reset(e){
    e.preventDefault();
    this.setState({hitSave: false});
  }
  componentDidMount(){
    this.props.columnStores[this.props.title].emit('change-value', this.props.store.matched[this.props.title]);
  }

  render() {
    if(!this.state.hitSave){
    return (
      <p>
        <span style={{color: 'tomato'}}>(Please Match)</span>
        <select style={{width: '75'}} defaultValue={this.props.store.matched[this.props.title]} onChange={this.select.bind(this)}>
          {Object.keys(this.props.store.rawData[0]).map((option, index) =>{
                  return (<option key={index} >{option}</option>);
            })}
        </select>
        <button onClick={this.finished.bind(this)} className="btn-small btn-primary">Save</button>
    </p>
    );
    } else {
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