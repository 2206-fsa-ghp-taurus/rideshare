import React, { useEffect, useState } from 'react';
import { Marker, Popup, FeatureGroup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { UseGeolocation } from './UseGeolocation';
import { useMap } from 'react-leaflet/hooks';
import L from 'leaflet';
import { myIcon } from './MarkerIcon'

export const UserMarker = () => {
  const map = useMap();
  const location = UseGeolocation();
  const [textAddress, setTextAddress] = useState('');

  const getTextAddress = () =>{
    const KEY = 'AIzaSyA5wgqeFPWEv0mYTOD4VJR2oh0wo1u-GC4'
    if (location.coordinates.lat && location.coordinates.lng){
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coordinates.lat},${location.coordinates.lng}&key=${KEY}`;
      fetch(url)
          .then(response => response.json())
          .then(data => {
            setTextAddress(data.results[0]?.formatted_address)
          })
    }
  }

  useEffect(() => {
    map.flyTo([location.coordinates.lat, location.coordinates.lng], 15, {
      animate: true, // set fly to to true
    });
      getTextAddress();
  }, [location.coordinates.lat, location.coordinates.lng, map]);


  return (
    <>
      {location.loaded && !location.error && (
        <FeatureGroup>
          <Marker
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={myIcon}>
            <Popup>
              You are here. {textAddress} <br />
            </Popup>
            <Circle
              center={[location.coordinates.lat, location.coordinates.lng]}
              radius={100}
            />
          </Marker>
        </FeatureGroup>
      )}
    </>
  );
};
