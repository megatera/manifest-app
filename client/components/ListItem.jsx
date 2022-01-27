import React, { Component } from 'react';

class ListItem extends Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.status === true) {
      return (
        <div className="listItem">
        <input type="checkbox" name={this.props.item} checked></input>
        <label for={this.props.item}>{this.props.item}</label>
      </div>
      )
    } 
    return (
      <div className="listItem">
        <input type="checkbox" name={this.props.item}></input>
        <label for={this.props.item}>{this.props.item}</label>
      </div>
    );
  }
}

export default ListItem;