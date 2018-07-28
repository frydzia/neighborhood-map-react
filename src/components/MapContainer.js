import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {

  render() {
    return (
      <div>
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
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDRok6s3pa6glNailpa7Fb-1GGuPJgc0p4')
})(MapContainer)
