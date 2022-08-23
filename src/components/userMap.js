import './UserMap.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import React, { useState, useEffect } from 'react';
import { UserMarker } from './UserMarker';
import SearchControl from './SearchControl';
import 'leaflet/dist/leaflet.css';
import { OpenStreetMapProvider } from 'react-leaflet-geosearch';
// import "react-leaflet-geosearch/node_modules/leaflet-geosearch/assets/css/leaflet.css";
//import * as ELG from "esri-leaflet-geocoder";


const UserMap = (props) => {
  const [position, setPosition] = useState({
    lat: 40.68972049114609,
    lng: -73.88470420874361,
  })


  return (
    <div>
      <div className='container'>
        <MapContainer ref={props.setMap} center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <UserMarker />
        </MapContainer>
      </div>
    </div>
  );
};

export default UserMap;
