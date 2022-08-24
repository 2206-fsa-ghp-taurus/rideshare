import './UserMap.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import React, { useState } from 'react';
import { UserMarker } from './UserMarker';
import 'leaflet/dist/leaflet.css';
import Routing from './Routing';
import LocationPickUp from "./LocationPickUp"
import LocationDropOff from "./LocationDropOff"


const UserMap = () => {
  const [position, setPosition] = useState({
    lat: 39.015979960290395,
    lng: -94.56373267199132,
  });

  const [pickUpCoords, setPickUpCoords] = useState({});
  const [dropOffCoords, setDropOffCoords] = useState({});

  return (
    <div>
      <div className='container'>
        <MapContainer center={position} zoom={13} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <UserMarker />
          <Routing pickUpCoords={pickUpCoords}/>
        </MapContainer>
      </div>
      <div>
        <LocationPickUp pickUpCoords={pickUpCoords} setPickUpCoords={setPickUpCoords}/>
        <LocationDropOff dropOffCoords={dropOffCoords} setDropoffCoords={setDropOffCoords}/>
      </div>
    </div>
  );
};

export default UserMap;
