import React, { Component } from 'react';

// var position = {props.places.map(place) => (
//   position={place.location}
// );

class Marker extends Component {
  

  render() {
    var marker = this.state.places.map((place) => {return (
      <Marker
          position={ place.location }
      >
      </Marker>
    )}

    )
  }
}

export default Marker;
