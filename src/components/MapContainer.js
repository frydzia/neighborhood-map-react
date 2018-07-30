import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
//import Marker from './Markers.js';

class MapContainer extends Component {

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
              zoom={15}
              initialCenter={{
                lat: 50.06465,
                lng: 19.94498
              }}
             />
          </div>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDRok6s3pa6glNailpa7Fb-1GGuPJgc0p4')
})(MapContainer)
