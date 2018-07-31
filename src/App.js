import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import './App.css';


class App extends Component {
  

  // var position = {this.state.places.map(place) => (
  //   position={place.location}
  // );

  render() {
    return (
      <div className="App">
        <div className="menu"></div>
        <h1 className="heading">Places for booklovers</h1>
        <MapContainer/>
      </div>
    );
  }
}

export default App;
