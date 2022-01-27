import React, { Component } from 'react';

class ListItem extends Component {
  constructor(props) {
    super(props);
    const { status, trip_id, item, item_id } = props;
    this.state = {
      status,
      trip_id,
      item_id,
      item
    }
  } 

  render() {
    const checkUncheck = (e) => {
      const { status, item_id, trip_id } = this.state;
      let newStatus = !status;
      console.log(newStatus);
      fetch('/list', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          item_id: item_id,
          trip_id: trip_id,
          status: newStatus,
        })
      })
        .then((res) => res.json())
        .then((res) => {
          const {status, item_id, trip_id} = res
          return this.setState({
            status,
            item_id,
            trip_id,
          })
        })
        .catch(err => console.log('ListItem.checkUncheck: PUT request: ERROR: ', err));
    }

    // if (this.props.status === true) {
    //   return (
    //     <div className="listItem">
    //       <input type="checkbox" name={this.props.item} onClick={checkUncheck} defaultChecked={this.props.status}></input>
    //       <label htmlFor={this.props.item} className="strikethrough">{this.props.item}</label>
    //     </div>
    //   )
    // } 
    return (
      <div className="listItem">
        <input type="checkbox" name={this.state.item} onClick={checkUncheck} defaultChecked={this.state.status}></input>
        <label htmlFor={this.state.item} className="strikethrough">{this.state.item}</label>
      </div>
    );
  }
}

export default ListItem;