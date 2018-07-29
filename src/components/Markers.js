import React, { Component } from 'react';

// var position = {props.places.map(place) => (
//   position={place.location}
// );

class Marker extends Component {
  state = {
    position: this.props.places.place
  }
  render() {
    return (
      <Marker
          position={ this.state.position }
      >
      </Marker>
    )
  }
}

export default Marker;
