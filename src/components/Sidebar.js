import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';


class Sidebar extends Component {
  state = {
    listOfPlaces: [],
    noSearchResult: '',
    query: ''
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

    // this.setState({ selectedPlace: place})
    // console.log(this.state.selectedPlace)
//    this.props.setVisiblePlaces(place)
    this.props.setActiveMarkerForSelectedPlace(place)
    this.props.openInfowindow(place.location.lat, place.location.lng, place.title)
  }

  updateQuery = (query) => {
    this.setState({
      query: query
    })
    this.props.closeInfowindow() // close opened infowindow when start typing

    if (query.trim()) {
      // search for places that match query
      const match = new RegExp(escapeRegExp(query), 'i')
      this.setState({
        listOfPlaces: this.state.listOfPlaces.filter(place => match.test(place.title)) // this filtering allows to display a list of places matching the query (Sidebar component's render() functuion uses listOfPlaces state to display list of places)
      })
      this.props.setVisiblePlaces(this.state.listOfPlaces.filter(place => match.test(place.title))) // this filtering allows to display markers matching the query (this data is passed to MapContainer component)
      
      // if there are no matching results, show info "No search results"
      if (this.state.listOfPlaces.length === 0) {
        this.setState({
          noSearchResult: 'No search result'
        })
      }
      } else {
      // if there is no query, set default state
      this.noQuery()
    }


  }

  // if there is no query, set default state
  noQuery = () => {
    this.setState({
      query: '',
      noSearchResult: '',
      listOfPlaces: this.props.defaultListOfPlaces
    })
    this.props.setVisiblePlaces(this.props.defaultListOfPlaces)
  }

  render() {
    return (
      <div className="sidebar-menu">
        <h3>Choose your favourite bookstore</h3>
        <input
          type="text"
          placeholder="Search!"
          onChange={event => this.updateQuery(event.target.value)}
					value={this.state.query}
          aria-label="Search bar"
          tabIndex="0"
          className="search-bar"
        />
        <hr />

        {this.state.listOfPlaces.length > 0 && this.state.listOfPlaces.map((place, index) => (
          <div
            className="place-from-list"
            aria-label="List of locations"
            role="list"
  					key={index}
            onClick={() => {this.openInfowindowAfterClickingSidebar(place)}}
            onKeyPress={() => {this.openInfowindowAfterClickingSidebar(place)}}
          >
          <p
            tabIndex="0"
            aria-label={`Open infowindow for ${place.title}`}
            role="listitem"
          >
            {place.title}
          </p>
          <hr />
          </div>
        ))}
        {this.state.listOfPlaces.length === 0 &&
          <div
            className="no-search-result"
          >
            <p>{this.state.noSearchResult}</p>
          </div>
        }
      </div>
    )
  }
}

Sidebar.propTypes = {
   defaultListOfPlaces: PropTypes.array.isRequired,
   setVisiblePlaces: PropTypes.func.isRequired,
   setActiveMarkerForSelectedPlace: PropTypes.func.isRequired,
   openInfowindow: PropTypes.func.isRequired
}

export default Sidebar;
