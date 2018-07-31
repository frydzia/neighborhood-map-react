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
        <div className="heading">
          <h1>Places for booklovers</h1>
        </div>  
        <MapContainer/>
      </div>
    );
  }
}

export default App;
