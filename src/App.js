import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="heading">
          <h1>Places for booklovers in Krakow</h1>
        </div>
        <MapContainer/>
      </div>
    );
  }
}

export default App;
