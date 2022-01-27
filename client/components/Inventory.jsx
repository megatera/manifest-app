import React, { Component } from 'react';

class Inventory extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <section>
        <header></header>
        <article>
        <div className="inventory">
          <select id="category" name="category">
            <option value="Standard">Standard</option>
            <option value="Wedding">Wedding</option>
            <option value="Hiking/Outdoors">Hiking/Outdoors</option>
            <option value="Scenic Travel">Scenic Travel</option>
            <option value="Beach">Beach</option>
          </select>
          <div className="itemsContainer">

          </div>
        </div>
        </article>
      </section>
    );
  }
}

export default Inventory;