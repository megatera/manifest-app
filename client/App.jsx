import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Trips from './components/Trips.jsx';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div>
          <div><h2 id="logotype">MANIFEST</h2></div>
          <Trips/>
        </div>
    );
  }
}

export default App;