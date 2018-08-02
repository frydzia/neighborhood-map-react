import React, { Component } from 'react';
import MapContainer from './MapContainer.js';


class Sidebar extends Component {
  state = {
    listOfPlaces: []
  }

  setListOfPlaces = () => {
    this.setState({
      listOfPlaces: this.props.places
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
        <input id="search" type="button" value="Search" />

        {this.state.listOfPlaces.map((place, index) => (
          <div
            className="placeFromList"
            tabIndex={this.state.listOfPlaces+index}
  					key={index}
          >
          {place.title}
          </div>
        ))}
      </div>
    )
  }
}

export default Sidebar;
