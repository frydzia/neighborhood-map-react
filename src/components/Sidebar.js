import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Sidebar extends Component {
  state = {
    listOfPlaces: [],
    selectedPlace: {},
//    sidebarPlace: {}
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


    // this.props.setActiveMarkerForSelectedPlace(place)
    // this.props.openInfowindow(place.location.lat, place.location.lng, place.title)
  }

  // searchMarker = () => {
  //   let markers = document.getElementsByClassName('gmnoprint');
  //   let markersArray = Array.prototype.slice.call(markers);
  //
  //   console.log(markersArray)
  // }

//props.openInfowindow(place.location.lat, place.location.lng, place.title)
  // onPlaceFromListClick = (placeProps) => {
  //   this.setState({
  //     clickedPlace: placeProps
  //   })
  //   alert(placeProps.title)
  // }


// this.searchMarker()
  // this.props.setActiveMarkerForSelectedPlace()
  // this.props.openInfowindow(place.location.lat, place.location.lng, place.title)
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
            onClick={() => {
              this.setState({ selectedPlace: place})
              this.props.setVisiblePlaces(place)
              }
            }
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
   defaultListOfPlaces: PropTypes.array.isRequired
//   clickedPlace: PropTypes.array.isRequired,
//   getVenue: PropTypes.func.isRequired
}

export default Sidebar;
