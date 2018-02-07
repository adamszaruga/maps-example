import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios'
import {withRouter} from 'react-router-dom';
import {GoogleApiWrapper, Map, Marker} from 'google-maps-react';

let mapContainerStyle = {
  width: "100%",
  height: "400px"
}

class MapContainer extends Component {
  
  constructor(props) {
    super(props);
    // the city lives in this.props.match.params.city
    this.state = {
      markers: [],
      destination: props.match.params.city
    }

  }
  // Almost all of this is going to happen in mapIsReady
  mapIsReady(mapProps, map) {
    // THIS IS HOW YOU GET YOUR MAP SET UP TO DISPLAY DIRECTIONS
    const {google} = mapProps;
    this.directionsService = new google.maps.DirectionsService(map);
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.directionsDisplay.setMap(map);

    // THIS IS HOW YOU DISPLAY A SPECIFIC ROUTE
    var destination;
    if (this.state.destination == 'nyc') {
      destination = "New York, NY";
    } else if (this.state.destination == "raleigh"){
      destination = "Raleigh, NC";
    }
    this.directionsService.route({
      origin: "Atlanta, GA",
      destination: destination,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

    // THIS IS WHERE YOU HIT UP SUNIT'S API WITH AXIOS
    axios.get('/restaurants/' + this.state.destination)
         .then(({restaurants})=>{
            this.setState({
              markers: restaurants
            })
         });
  }


  render() {
    return (
      <Row style={{minHeight: 400}}>
        <Col xs={3}>
          <h1>Hey look!</h1>
          <h3>This container has stuff in it!</h3>
        </Col>
        <Col xs={9}>
          <div className="MapContainer" style={mapContainerStyle}>
            <Map google={this.props.google} 
                 zoom={14} 
                 onReady={this.mapIsReady.bind(this)} 
                 initialCenter={{
                    lat: 40.854885,
                    lng: -88.081807
                 }}  >
   
              {this.state.markers.map((location, index)=>{
                return (
                  <Marker key={index} onClick={this.onMarkerClick}
                      position={location}/>
                )
              })}
            </Map>
          </div>
        </Col>
      </Row>
      
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDNuItJFwMzzpUodZsvBLBNN8zyKUQXgws"
})(withRouter(MapContainer));
