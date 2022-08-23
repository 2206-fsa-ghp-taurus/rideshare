import './UserMap.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import React, { useState } from 'react';
import { UserMarker } from './UserMarker';
import SearchBar from './SearchBar';
import 'leaflet/dist/leaflet.css';
import Routing from './Routing';

const UserMap = () => {
  const [position, setPosition] = useState({
    lat: 39.015979960290395,
    lng: -94.56373267199132,
  });

  const [selectPosition, setSelectPosition] = useState(null);

  return (
    <div>
      <div className='container'>
        <MapContainer center={position} zoom={13} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <UserMarker />
          <Routing />
        </MapContainer>
      </div>
      <div id='controlBar'>
        {/* {map ? (
          <SearchControl container='controlBar' map={map} provider={prov} />
        ) : null} */}
        <SearchBar
          selectPosition={selectPosition}
          setSelectPosition={setSelectPosition}
        />
      </div>
    </div>
  );
};

export default UserMap;
