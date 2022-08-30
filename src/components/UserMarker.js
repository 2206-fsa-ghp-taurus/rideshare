import React, { useEffect } from 'react';
import { Marker, Popup, FeatureGroup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { UseGeolocation } from './UseGeolocation';
import { useMap } from 'react-leaflet/hooks';
import L from 'leaflet';
import { myIcon } from './MarkerIcon'

export const UserMarker = () => {
  const map = useMap();
  const location = UseGeolocation();

  useEffect(() => {
    map.flyTo([location.coordinates.lat, location.coordinates.lng], 15, {
      animate: false,
    });
  }, [location.coordinates.lat, location.coordinates.lng, map]);

  return (
    <>
      {location.loaded && !location.error && (
        <FeatureGroup>
          <Marker
            position={[location.coordinates.lat, location.coordinates.lng]}
            icon={myIcon}>
            <Popup>
              You are here. <br />
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
