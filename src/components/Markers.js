import React, { Component } from 'react';

// var position = {props.places.map(place) => (
//   position={place.location}
// );

class Marker extends Component {
  state = {
    position: ''

  }

  getPlace = () => { this.props.places.map((place) => (
    this.setState({ position: place })
  )

  )

  }
  render() {
    this.getPlace()
    
    return (

      <Marker
          position={ this.state.position }
      >
      </Marker>
    )
  }
}

export default Marker;
