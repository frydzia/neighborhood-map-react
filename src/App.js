import React, { Component } from 'react';
import MapContainer from './components/MapContainer';
import './App.css';


class App extends Component {
  state = {
    places: [
      {title: 'Massolit Books & Cafe', location: {lat: 50.058312, lng: 19.92972}},
      {title: 'Bona Książka i Kawa', location: {lat: 50.056684, lng: 19.937394}},
      {title: 'Lokator Coffee & Books', location: {lat: 50.048117, lng: 19.9454}},
      {title: 'De Revolutionibus Books & Cafe', location: {lat: 50.059598, lng: 19.936324}},
      {title: 'MOCAK Bookstore', location: {lat: 50.04767, lng: 19.961561}},
      {title: 'Główna Księgarnia Naukowa', location: {lat: 50.063037, lng: 19.932079}},
      {title: 'Skład Tanich Książek', location: {lat:  50.0575, lng: 19.938381}}
    ]
  }

  render() {
    return (
      <div className="App">
        <MapContainer />
      </div>
    );
  }
}

export default App;
