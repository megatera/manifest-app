import React, { Component } from 'react';
import TripBox from './TripBox.jsx';

class Trips extends Component {
  constructor() {
    super();
    this.state = {
      fetchedTrips: true,
      trips: [],
      user_id: 1,
    }
  }
  
  componentDidMount(){
    fetch(`/trips?user_id=${this.state.user_id}`)
      .then(res => res.json())
      .then((trips) => {
        if (!Array.isArray(trips)) trips = [];
        return this.setState({
          trips,
          fetchedTrips: true,
        });
      })
      .catch(err => console.log('Trips.componentDidMount: GET trips: ERROR: ', err));
  }

  render() {
    if (!this.state.fetchedTrips) return (
      <div>
        <h1>Loading trips, please wait...</h1>
      </div>
    );

    const { trips } = this.state;

    if (!trips) return null;

    if (!trips.length) return (
      <div>You currently have no trips planned.</div>
    )

    const tripBoxes = trips.map((trip, i) => {
      return (
        <TripBox key={i} destination={trip.name} trip_id={trip._id}/>
      )
    })

    const addTrip = (e) => {
      let tripToAdd = document.querySelector('#newDestination').value;
      const { user_id }  = this.state;
      fetch(`/trips?user_id=${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          destination: tripToAdd,
          user_id: user_id,
        })
      })
        .then((res) => res.json())
        .then((trips) => {
          if (!Array.isArray(trips)) trips = [];
          return this.setState({
            trips,
            fetchedTrips: true,
          });
        })
        .then(() => document.getElementById('newDestination').value = '')
        .catch((err) => console.log('Trips.addTrip: POST trip: ERROR: ', err));
    }

    return(
      <div className="tripContainer">
        <h3>Upcoming Trips</h3>
        {tripBoxes}
        <input type="text" id="newDestination"></input>
        <button id="addTrip" onClick={addTrip}>Add Trip</button>
      </div>
    );
  }
}

export default Trips;