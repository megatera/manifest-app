import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ItemsContainer from './ItemsContainer.jsx';

function Inventory() {
  const location = useLocation();
  const { trip_id } = location.state;
  const [category, setCategory] = useState('Standard');
  const [buttonStatus, setButtonStatus] = useState(false);

  const updateCategory = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
  }

  const addItemsToList = () => {
    const checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');
    const selectedItems = [];
    checkedBoxes.forEach((el) => selectedItems.push(el.id));
    fetch('/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trip_id: trip_id,
        item_ids: selectedItems,
      })
    })
      .then((res) => res.json())
      .then((updatedInventory) => {
        setFetch(false);
        setButtonStatus(true);
      })
      .catch(err => console.log('Inventory.addItemsToList: Error:', err));
  }

  const disableAddButton = (e) => {
    const checkedBoxes = document.querySelectorAll('input[typed=checked:checked');
    if (!checkedBoxes.length) {
      return setButtonStatus(false);
    }
    setButtonStatus(false);
  }

  return (
    <section>
      <header>
        <div className="nav">
          <Link to="/"><button id="close">Close</button></Link>
          <div className="subNav">
            <button id="selectAll">Select All</button>
            <button className="addItems" onClick={addItemsToList} disabled={buttonStatus}>Add Items</button>
          </div>
        </div>
      </header>
      <article>
      <div className="inventory">
        <select id="category" name="category" onChange={updateCategory}>
          <option value="Standard" defaultValue="selected">Standard</option>
          <option value="Wedding">Wedding</option>
          <option value="Hiking/Outdoors">Hiking/Outdoors</option>
          <option value="Scenic Travel">Scenic Travel</option>
          <option value="Beach">Beach</option>
        </select>
          <ItemsContainer category={category} onClick={disableAddButton} trip_id={trip_id} />
      </div>
      </article>
    </section>
  );
}

export default Inventory;