import React, { Component } from 'react';
import ListItem from './ListItem.jsx';
import Inventory from './Inventory.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

class List extends Component {
  constructor() {
    super();
    this.state = {
      user_id: 1,
      list_items: [],
      fetchedListItems: false,
      showInventory: false,
    }
  }

  componentDidMount(){
    fetch(`/list?trip_id=${this.props.trip_id}`)
      .then((res) => res.json())
      .then((list_items) => {
        if (!Array.isArray(list_items)) list_items = [];
        return this.setState({
          list_items,
          fetchedListItems: true,
        });
      })
      .catch((err) => console.log('List.componentDidMount: GET list items ERROR: ', err));
  }

  render(){
    if (!this.state.fetchedListItems) return (
      <div>
        <p>Loading list, please wait...</p>
      </div>
    );

    const { list_items } = this.state;

    if (!list_items) return null;

    if (!list_items.length) return (
      <div>
        <p>You don't have any items in your list yet.</p>
        <button className="addItems">Add Items</button>
      </div>
    )
    
    //TO DO: update query in controller to respond with item_id
    const listItems = list_items.map((list_item, i) => {
      return <ListItem key={i} trip_id={this.props.trip_id} item_id={list_item.item_id} item={list_item.item} status={list_item.status}/>
    });
    console.log(listItems);

    const openInventory = (e) => {
      console.log('clicked');
      return this.setState({
        showInventory: true,
      })
    }

    if (this.state.showInventory) {
      return(
          <div>
            <Inventory />
          </div>
      );
    }

    return(
      <div>
        {listItems}
        <button className="addItems" onClick={openInventory}>Add Items</button>
      </div>
    );
  }
}

export default List;