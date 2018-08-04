import React, { Component } from 'react';
import { InfoWindow, Map, Marker, GoogleApiWrapper } from 'google-maps-react';
// import PropTypes from 'prop-types';
import * as FoursquareAPI from './FoursquareAPI.js';
import logo from '../powered-by-foursquare-grey.png';
import Sidebar from './Sidebar.js';


class MapContainer extends Component {
  state = {
    places: [
      {title: 'Massolit Books & Café', location: {lat: 50.058312, lng: 19.92972}},
      {title: 'Bona Książka i Kawa', location: {lat: 50.056684, lng: 19.937394}},
      {title: 'Lokator Coffee & Books', location: {lat: 50.048117, lng: 19.9454}},
      {title: 'De Revolutionibus Books & Cafe', location: {lat: 50.059598, lng: 19.936324}},
      {title: 'MOCAK Bookstore', location: {lat: 50.04767, lng: 19.961561}},
      {title: 'Główna Księgarnia Naukowa', location: {lat: 50.063037, lng: 19.932079}},
      {title: 'Skład Tanich Książek', location: {lat:  50.0575, lng: 19.938381}}
    ],
    bounds: {},
    showInfoWindow: false,
    activeMarker: {},
    clickedPlace: {},
    address: '',
    description: '',
    rating: '',
    phone: '',
    photo: ''
  }

  // set the map boundaries according to the location of the places
  setBounds = () => {
    let bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < this.state.places.length; i++) {
      bounds.extend(this.state.places[i].location)
    }

    this.setState({bounds})
  }

  componentDidMount(){
    this.setBounds()
  }

  // set parameters/state for the clicked marker
  onMarkerClick = (placeProps, marker, e) => {
    this.setState({
      clickedPlace: placeProps,
      activeMarker: marker,
      showInfoWindow: true
    })

    // open infowindow when marker is clicked with information about clicked place
    this.openInfowindow(placeProps.position.lat, placeProps.position.lng, placeProps.title)
  }

  openInfowindow = (lat, lng, name) => {
    // get data about the place from foursquare API
    FoursquareAPI.getVenue(lat, lng, name).then((response) => {
      if (response === 'error') {  // handle errors
        console.log('response error')
        alert('Sorry, we could not load the content')
      } else {
        // store the space id - it is needed to get detailed information form foursquare API
        let venueID = response[0].id;

        // get detailsed data about the place from foursquare API
        FoursquareAPI.getDetailInfo(venueID).then((response) => {

          // set the rating if available
          if(response.rating) {
            this.setState({rating: response.rating});
          } else {
            this.setState({rating: 'no rating'});
          }

          // set the photo if available
          if(response.bestPhoto) {
            this.setState({photo: response.bestPhoto.prefix+'width150'+response.bestPhoto.suffix});
          } else {
            this.setState({photo: ''});
          }

          // set the address if available
          if(response.location.address) {
            this.setState({address: response.location.address});
          } else {
            this.setState({address:'no address'});
          }

          // set the description if available
          if(response.desciption) {
            this.setState({desciption: response.desciption});
          } else {
            this.setState({desciption: ''});
          }

          // set the phone number if available
          if(response.contact.formattedPhone) {
            this.setState({phone: response.contact.formattedPhone});
          } else {
            this.setState({phone: 'no phone number'});
          }

        }).catch(() => { // handle errors
          console.log('foursquareDetailError')
        })
      }

    }).catch(() => { // handle errors
      console.log('foursquareError')
      alert('Sorry, we could not load the content')
    })
  }

  // return content
  render() {
    return (
      <div className="container">
        <Sidebar
          defaultListOfPlaces={this.state.places}
        />
        <div role="application" className="map" ref="map">
          <Map
            google={this.props.google}
            style={{
              width: '100%',
              height: '100%'
            }}
            zoom={15}
            initialCenter={{
              lat: 50.06465,
              lng: 19.94498
            }}
            bounds={this.state.bounds}
           >
            {this.state.places.map((place, index) =>
              <Marker
                position = {place.location}
                key = {index}
                title = {place.title}
                onClick = { this.onMarkerClick }
              />
            )}
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showInfoWindow}>
                <div className="info-window">
                  <h2>{this.state.clickedPlace.title}</h2>
                  <img  tabIndex="0"   src={this.state.photo}   alt={this.state.activeMarker.title + ' photo'}/>
                  <p>Address: {this.state.address}</p>
                  <p>Contact: {this.state.phone}</p>
                  <p>{this.state.description}</p>
                  <p>Rating: {this.state.rating}</p>
                  <img className="logo" src={logo} alt="Foursquare logo"/>
                </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    )
  }
}

// MapContainer.propTypes = {
//   activeMarkers: PropTypes.array.isRequired,
//   clickedPlace: PropTypes.array.isRequired,
//   getVenue: PropTypes.func.isRequired
// }

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAHzXNyo0NQsCWdHYLGpzBwwYayU2beOMs')
})(MapContainer)
