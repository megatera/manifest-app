import React, { Component } from 'react';
import ItemBox from './ItemBox.jsx';

class ItemsContainer extends Component {
  constructor(props) {
    super(props);
    const { fetchedItems } = props; 
    this.state = {
      items: [],
      fetchedItems,
    }
    this.disableAddButton = this.props.disableAddButton;
  }

  componentDidMount(){
    console.log('itemscontainer component did mount')
    fetch(`/inventory?category=${this.props.category}&trip_id=${this.props.trip_id}`)
      .then(res => res.json())
      .then((items) => {
        if (!Array.isArray(items)) items = [];
        return this.setState({
          items,
          fetchedItems: true,
        });
      })
      .catch(err => console.log('ItemsContainer.componentDidMount: GET items from inventory: ERROR: ', err));
  }

  componentDidUpdate(){
    if (!this.props.fetchedItems) {
    console.log('itemscontainer component did update')
    fetch(`/inventory?category=${this.props.category}&trip_id=${this.props.trip_id}`)
      .then(res => res.json())
      .then((items) => {
        if (!Array.isArray(items)) items = [];
        return this.setState({
          items,
          fetchedItems: true,
        });
      })
      .catch(err => console.log('ItemsContainer.componentDidMount: GET items from inventory: ERROR: ', err));
    }
  }

  render() {
    console.log('items container render');
    if (!this.state.fetchedItems) return (
      <div>
        <p>Loading items, please wait...</p>
      </div>
    );

    const { items } = this.state;

    if (!items) return null;

    if (!items.length) return (
      <div>Uh oh, something went wrong. The inventory is empty.</div>
    )

    const itemBoxes = items.map((item, i) => {
      return (
        <ItemBox key={i} item={item.name} item_id={item._id} onClick={this.props.disableAddButton}/>
      )
    })
    console.log('items container render boxes');
    return(
      <div className="itemsContainer">
        {itemBoxes}
      </div>
    );
  }
}

export default ItemsContainer;