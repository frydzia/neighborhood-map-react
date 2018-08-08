import React, { Component } from 'react';
import { InfoWindow, Map as MyMap, Marker, GoogleApiWrapper } from 'google-maps-react';
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
    visiblePlaces: [], // list of places for which markers are displayed
    markerObjects: new Map(),
    bounds: {},
    showInfoWindow: false,
    activeMarker: {},
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

  // displays all location markers by default
  setDefaultVisiblePlaces = () => {
    this.setState({
      visiblePlaces: this.state.places
    })
  }

  componentDidMount(){
    this.setBounds()
    this.setDefaultVisiblePlaces()
  }

  // set visible places after typing sth in search input
  setVisiblePlaces = (sidebarPlace) => {
    this.setState({
      visiblePlaces: sidebarPlace
    })
  }

  // save marker into markerObjects map object
  registerMarker = (element) => {
    if (element != null) {
    this.state.markerObjects.set(element.marker.title, element.marker)
    }
  }

  // set parameters/state for the clicked marker
  onMarkerClick = (placeProps, marker, e) => {
    // display "loading" while waiting for data from foursquare
    this.setState({
      address: 'Loading...',
      description: 'Loading...',
      rating: 'Loading...',
      phone: 'Loading...',
      photo: 'Loading...'
    })
    // set state for clicked marker
    this.setState({
      activeMarker: marker,
      showInfoWindow: true
    })
    // open infowindow when marker is clicked
    this.openInfowindow(placeProps.position.lat, placeProps.position.lng, placeProps.title)
  }

  // close infowindow
  closeInfowindow = () => {
    this.setState({
      showInfoWindow: false,
      visiblePlaces: this.state.places,
      activeMarker: {},
    })
  }

  setActiveMarkerForSelectedPlace = (selectedPlace) => {
    // display "loading" while waiting for data from foursquare
    this.setState({
      address: 'Loading...',
      description: 'Loading...',
      rating: 'Loading...',
      phone: 'Loading...',
      photo: 'Loading...'
    })
    // get current marker from markerObjects based on the name of the place that was clicked on the sidebar
    let currentMarker = this.state.markerObjects.get(selectedPlace.title)

    this.setState({
      activeMarker: currentMarker,
      showInfoWindow: true
    })
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
            this.setState({photo: response.bestPhoto.prefix+'width160'+response.bestPhoto.suffix});
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
          if(response.description) {
            this.setState({description: response.description});
          } else {
            this.setState({description: ''});
          }
          // set the phone number if available
          if(response.contact.formattedPhone) {
            this.setState({phone: response.contact.formattedPhone});
          } else {
            this.setState({phone: 'no phone number'});
          }
        }).catch(() => { // handle errors
          console.log('foursquareDetailError')
          this.setState({
            rating: "Sorry, can't load rating",
            phone: "Sorry, can't load rating",
            desciption: '',
            address: "Sorry, can't load rating",
            photo: ''
          })
        })
      }
    }).catch(() => { // handle errors
      console.log('foursquareError')
      alert("Sorry, can't load infowindow content")
    })
  }


  render() {
    const { activeMarker } = this.state

    return (
      <div className="map-container">
        <Sidebar
          defaultListOfPlaces={this.state.places}
          openInfowindow={this.openInfowindow}
          closeInfowindow={this.closeInfowindow}
          setActiveMarkerForSelectedPlace={this.setActiveMarkerForSelectedPlace}
          setVisiblePlaces={this.setVisiblePlaces}
        />
        <div role="application" id="map">
          <MyMap
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
            ref={'map'}
            onClick={this.closeInfowindow}
           >
            {this.state.visiblePlaces.map((place, index) =>
              <Marker
                ref={this.registerMarker} // assign ref attribute to store reference to marker
                position={place.location}
                key={index}
                title={place.title}
                onClick={this.onMarkerClick}
                icon={activeMarker.title === place.title ? {url: 'http://maps.gstatic.com/mapfiles/markers2/icon_green.png'} : {url: 'http://maps.gstatic.com/mapfiles/markers2/marker.png'}}
              />
            )}
            <InfoWindow
              marker={activeMarker}
              visible={this.state.showInfoWindow}
              onClose={this.closeInfowindow}
            >
                <div
                  className="info-window"
                  aria-label={`InfoWindow on ${activeMarker.title}`}
                  tabIndex="0"
                >
                  <h2>{activeMarker.title}</h2>
                  <img
                    className="place-photo"
                    src={this.state.photo}
                    alt={activeMarker.title + ' photo'}
                  />
                  <div className="data">
                    <p>Address: {this.state.address}</p>
                    <p>Contact: {this.state.phone}</p>
                    <p>{this.state.description}</p>
                    <p>Rating: {this.state.rating}</p>
                  </div>
                  <img
                    className="logo"
                    src={logo}
                    alt="Foursquare logo"
                  />
                </div>
            </InfoWindow>
          </MyMap>
        </div>
      </div>
    )
  }
}


export default GoogleApiWrapper({
  apiKey: ('AIzaSyAHzXNyo0NQsCWdHYLGpzBwwYayU2beOMs')
})(MapContainer)
