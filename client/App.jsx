import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Inventory from './components/Inventory.jsx';
import Trips from './components/Trips.jsx';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div>
          <div><h2 id="logotype">MANIFEST</h2></div>
          <Router>
            <Routes>
              <Route exact path="/" element={<Trips/>}></Route>
              <Route exact path="/trip" element={<Trips/>}></Route>
              <Route exact path="/inventory" element={<Inventory/>}></Route>
            </Routes>
          </Router>
        </div>
    );
  }
}

export default App;