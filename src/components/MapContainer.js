import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
//import Marker from './Markers.js';

class MapContainer extends Component {
  state = {
    places: [
      {title: 'Massolit Books & Cafe', location: {lat: 50.058312, lng: 19.92972}},
      {title: 'Bona Książka i Kawa', location: {lat: 50.056684, lng: 19.937394}},
      {title: 'Lokator Coffee & Books', location: {lat: 50.048117, lng: 19.9454}},
      {title: 'De Revolutionibus Books & Cafe', location: {lat: 50.059598, lng: 19.936324}},
      {title: 'MOCAK Bookstore', location: {lat: 50.04767, lng: 19.961561}},
      {title: 'Główna Księgarnia Naukowa', location: {lat: 50.063037, lng: 19.932079}},
      {title: 'Skład Tanich Książek', location: {lat:  50.0575, lng: 19.938381}}
    ],
    bounds: {}
  }

  setBounds = () => {
    let bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < this.state.places.length; i++) {
      bounds.extend(this.state.places[i].location);
    }

    this.setState({bounds})
  }
  //   for (let i = 0; i < this.state.places.length; i++) {
  //     bounds.extend(this.state.places[i].location);
  //   }
  //   this.refs.map.fitBounds(bounds)
  // }

  componentDidMount(){
    this.setBounds();
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="sidebarMenu">
          Menue
          </div>
          <div role="application" className="map" ref="map">
            <Map
              google={this.props.google}
              style={{
                width: '100%',
                height: '100%'
              }}
              zoom={14}
              initialCenter={{
                lat: 50.06465,
                lng: 19.94498
              }}
              bounds={this.state.bounds}
          //    ref={(ref) => { this.map = ref; }}
             >
              {this.state.places.map((place, index) =>
                <Marker
                  position = {place.location}
                  key = {index}
                  title = {place.title}
                />
              )}
            </Map>
          </div>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDRok6s3pa6glNailpa7Fb-1GGuPJgc0p4')
})(MapContainer)
