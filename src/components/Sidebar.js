import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';


class Sidebar extends Component {
  state = {
    listOfPlaces: [],
    noSearchResult: '',
    query: '',
    selectedPlace: []
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
    this.props.setVisiblePlaces(this.state.listOfPlaces)
    this.setState({ query: query })

    if (query.trim()) {
      // search for places that match query
      const match = new RegExp(escapeRegExp(query), 'i')
      this.setState({
        listOfPlaces: this.props.defaultListOfPlaces.filter(place => match.test(place.title))
      })
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
      <div className="sidebarMenu">
        <h3>Choose your favourite bookstore</h3>
        <input
          id="search-text"
          type="text"
          placeholder="Search!"
          onChange={event => this.updateQuery(event.target.value)}
					value={this.state.query}
        />

        { this.state.listOfPlaces.length > 0 && this.state.listOfPlaces.map((place, index) => (
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
        {this.state.listOfPlaces.length === 0 &&
          <div
            className="noSearchResult">
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
