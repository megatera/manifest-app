import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import List from './List.jsx';

class TripBox extends Component {
  constructor() {
    super();
    this.state = {
      viewList: false,
    }
  }

  render() {
    const showHideList = (e) => {
      if (!this.state.viewList) {
        return this.setState({
          viewList: true,
        });
      }
      return this.setState({
        viewList: false,
      });
    }

    if (this.state.viewList) {
      return (
        <div>
          <button className="trip" onClick={showHideList}>{this.props.destination}</button>
          <List trip_id={this.props.trip_id}/>
        </div>
      )
    }
    return (
      <div>
          <button className="trip" onClick={showHideList}>{this.props.destination}</button>
      </div>
    );
  }
}

export default TripBox;