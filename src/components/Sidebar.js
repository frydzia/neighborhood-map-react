import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Sidebar extends Component {
  state = {
    listOfPlaces: []
  }

  setListOfPlaces = () => {
    this.setState({
      listOfPlaces: this.props.defaultListOfPlaces
    })
  }

  componentDidMount(){
    this.setListOfPlaces()
  }

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
          >
          {place.title}
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
