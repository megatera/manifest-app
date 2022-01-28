import React, { Component } from 'react';

class ItemBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    }
  }

  render(){
    return(
      <div className="inventoryItem">
        <input type="checkbox" name={this.props.item} item_id={this.props.item_id} className="inventoryItem" id={this.props.item_id} onClick={this.props.disableAddButton} defaultChecked={this.state.checked}/>
        <label htmlFor={this.props.item}>{this.props.item}</label>
      </div>
    );
  }
}

export default ItemBox;