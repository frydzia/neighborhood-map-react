import React, { Component } from 'react';
import { InfoWindow, Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import * as FoursquareAPI from './FoursquareAPI.js';
import logo from '../powered-by-foursquare-grey.png';


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

  onMarkerClick = (placeProps, marker, e) => {
    this.setState({
      clickedPlace: placeProps,
      activeMarker: marker,
      showInfoWindow: true
    })
//    console.log(placeProps)
    this.getInfowindowDetailInfo(placeProps.position.lat, placeProps.position.lng, placeProps.title)
  }

  getInfowindowDetailInfo = (lat, lng, name) => {
    FoursquareAPI.getVenue(lat, lng, name).then((response) => {
      if (response === 'error') {
        console.log('response error')
        alert('Sorry, we could not load the content')
      } else {

        let venueID = response[0].id;
//        console.log(response)
        FoursquareAPI.getDetailInfo(venueID).then((response) => {
          console.log(response)

          if(response.rating) {
            this.setState({rating: response.rating});
          } else {
            this.setState({rating: 'no rating'});
          }

          if(response.bestPhoto) {
            this.setState({photo: response.bestPhoto.prefix+'width150'+response.bestPhoto.suffix});
          } else {
            this.setState({photo: ''});
          }

          if(response.location.address) {
            this.setState({address: response.location.address});
          } else {
            this.setState({address:'no address'});
          }

          if(response.desciption) {
            this.setState({desciption: response.desciption});
          } else {
            this.setState({desciption: ''});
          }

          if(response.contact.formattedPhone) {
            this.setState({phone: response.contact.formattedPhone});
          } else {
            this.setState({phone: 'no phone number'});
          }

        }).catch(() => {
          console.log('foursquareDetailError')
        })
      }

    }).catch(() => {
      console.log('foursquareError')
      alert('Sorry, we could not load the content')
    })
  }

  render() {
    return (
      <div className="container">
        <div className="sidebarMenu">
        Menue
        </div>
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

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDRok6s3pa6glNailpa7Fb-1GGuPJgc0p4')
})(MapContainer)
