import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';


class Sidebar extends Component {
  state = {
    listOfPlaces: [],
    searchResult: '',
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
    this.setState({ query: query })

    if (query.trim()) {
      if (this.state.listOfPlaces.length > 0) {
        const match = new RegExp(escapeRegExp(query), 'i')
        this.setState({
          listOfPlaces: this.props.defaultListOfPlaces.filter(place => match.test(place.title))
        })
        this.props.setVisiblePlaces(this.state.listOfPlaces)
      } else {
        this.setState({
          searchResult: true
      })}
    } else {
      this.clearQuery()
    }
  }

  clearQuery = () => {
    this.setState({
      query: '',
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
        {this.state.searchResult === true &&
          <div
            className="noSearchResult">
            <p>No search result</p>
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
