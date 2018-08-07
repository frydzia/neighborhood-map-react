import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Sidebar extends Component {
  state = {
    listOfPlaces: [],
//    selectedPlace: {}
  }

  setListOfPlaces = () => {
    this.setState({
      listOfPlaces: this.props.defaultListOfPlaces,
    })
  }

  componentDidMount(){
    this.setListOfPlaces()
  }

  openInfowindowAfterClickingSidebar = (place) => {
//      this.setState({ selectedPlace: place})
    this.props.setVisiblePlaces(place)
    this.props.setActiveMarkerForSelectedPlace(place)
    this.props.openInfowindow(place.location.lat, place.location.lng, place.title)
  }


// this.searchMarker()

  render() {
    return (
      <div className="sidebarMenu">
        <h3>Choose your favourite bookstore</h3>
        <input id="search-text" type="text" placeholder="Enter place!" />
        <input id="search" type="button" value="Search" onClick={() => this.setListOfPlaces()}/>


        { this.state.listOfPlaces.map((place, index) => (
          <div
            className="placeFromList"
            tabIndex={this.state.listOfPlaces+index}
  					key={index}
            onClick={() => {this.openInfowindowAfterClickingSidebar(place)}}
          >
          <p>{place.title}</p>
          <hr />
          </div>
        ))}
      </div>
    )
  }
}

Sidebar.propTypes = {
   defaultListOfPlaces: PropTypes.array.isRequired,
   setVisiblePlaces: PropTypes.func.isRequired,
   setActiveMarkerForSelectedPlace: PropTypes.func.isRequired,
   openInfowindow: PropTypes.func.isRequired
//   clickedPlace: PropTypes.array.isRequired,
//   getVenue: PropTypes.func.isRequired
}

export default Sidebar;
