import React, { Component } from 'react';
import './App.css';
import L from 'leaflet';

import locationURL from './icon.svg';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

const myIcon = L.icon({
    iconUrl:locationURL,
    iconSize: [24, 41],
});

class App extends Component {
  state ={
    dali: [],
    location:{
      lat: 0,
      lng: -40,
    },
    zoom: 3
  }

  componentDidMount(){
    fetch('http://mappy.dali.dartmouth.edu/members.json')
    .then( (data) => {
      return data.json();
    }).then ( (members) => {
      this.setState({dali: members});
    });
  }

  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    return (
      <div className="map">
      <Map
        className ="map"
        worldCopyJump={true}
        center={position}
        zoom={this.state.zoom}>
        <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors and Chat location by Iconika from the Noun Project"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.dali.map( (person) =>
          <Marker
            position ={[person.lat_long[0], person.lat_long[1]]}
            icon={myIcon}
            >
            <Popup>
              <p> <b> {person.name}</b> says : {person.message}</p>
            </Popup>
          </Marker>
        )}

      </Map>
    </div>
    );
  }
}

export default App;
