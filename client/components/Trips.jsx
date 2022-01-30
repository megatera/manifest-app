import React, { Component } from 'react';
import TripBox from './TripBox.jsx';


class Trips extends Component {
  constructor() {
    super();
    this.state = {
      fetchedTrips: true,
      trips: [],
      user_id: 1,
      addButtonDisabled: true,
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
          addButtonDisabled: true,
        });
      })
      .catch(err => console.log('Trips.componentDidMount: GET trips: ERROR: ', err));
  }

  render() {
    const disableAddButton = (e) => {
      if (e.target.value.trim() !== '') {
        this.setState({addButtonDisabled: false,})
      }
    }

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
            addButtonDisabled: true,
          });
        })
        .then(() => document.getElementById('newDestination').value = '')
        .catch((err) => console.log('Trips.addTrip: POST trip: ERROR: ', err));
    }

    if (!this.state.fetchedTrips) return (
      <div>
        <h1>Loading trips, please wait...</h1>
      </div>
    );

    const { trips } = this.state;

    if (!trips) return null;

    if (!trips.length) return (
      <div>
        <p>You currently have no trips planned.</p>
        <input type="text" id="newDestination" placeholder="Trip name" onChange={disableAddButton}/>
        <button id="addTrip" onClick={addTrip} disabled={this.state.addButtonDisabled} >Add Trip</button>
      </div>
    )

    const tripBoxes = trips.map((trip, i) => {
      return (
        <TripBox key={i} destination={trip.name} trip_id={trip._id}/>
      )
    })

    return(
      <div className="tripContainer">
        <h4>Upcoming Trips</h4>
        {tripBoxes}
        <input type="text" id="newDestination" placeholder="Trip name" onChange={disableAddButton}></input>
        <button id="addTrip" onClick={addTrip} disabled={this.state.addButtonDisabled} >Add Trip</button>
      </div>
    );
  }
}

export default Trips;