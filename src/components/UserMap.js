import './userMap.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserMarker } from './UserMarker';
import 'leaflet/dist/leaflet.css';
import Routing from './Routing';
import LocationPickUp from './LocationPickUp';
import LocationDropOff from './LocationDropOff';
import { UseGeolocation } from './UseGeolocation';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { DriverContext} from '../driverContext';

const UserMap = (props) => {
  const [position, setPosition] = useState({
    lat: 39.015979960290395,
    lng: -94.56373267199132,
  });

  const [pickUpCoords, setPickUpCoords] = useState({});
  const [dropOffCoords, setDropOffCoords] = useState({});
  const [pickUpAddress, setPickUpAddress] = useState('');
  const [dropOffAddress, setDropOffAddress] = useState('');
  const { isDriver, setIsDriver } = useContext(DriverContext);
  const { selectedDrive } = props;
  const { userDistance, setUserDistance } = props;
  const [disableConfirm, setDisableConfirm] = useState(false);
  const { userId } = useAuth();
  const location = UseGeolocation();
  const mapRef = useRef();

  const beDriver = (e) => {
    addDoc(collection(db, 'Rides'), {
      // on the Rides table
      driverId: userId,
      timestamp: serverTimestamp(),
      driverPickUp: pickUpCoords, // may be overwriitten by rides detail later
      driverDropOff: dropOffCoords,
      // no status information yet.
    });
    updateDoc(doc(db, 'Users', userId), {
      driverStatus: true,
    });
    setIsDriver(true)
    setDisableConfirm(true);
  };

  const findDriver = () => {
    // temporarly put on user table, can delete after ride is complete
    console.log('userDistance', userDistance);
    updateDoc(doc(db, 'Users', userId), {
      pickUp: pickUpCoords,
      dropOff: dropOffCoords,
      distanceTravelled: userDistance,
      pickUpAddress: pickUpAddress,
      dropOffAddress: dropOffAddress,
    });
  };

  const locateMe = () => {
    mapRef.current.flyTo([location.coordinates.lat, location.coordinates.lng]);
  };

  console.log(isDriver, selectedDrive);

  return (
    <div>
      <div className='container'>
        <MapContainer ref={mapRef} center={position} zoom={13} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <UserMarker />
          <Routing
            pickUpCoords={pickUpCoords}
            dropOffCoords={dropOffCoords}
            setUserDistance={setUserDistance}
          />
        </MapContainer>
      </div>
      <div>
        (
        <button class='btn btn-xs' onClick={locateMe}>
          Locate Me
        </button>
        )
      </div>
      <div>
        <LocationPickUp
          pickUpCoords={pickUpCoords}
          setPickUpCoords={setPickUpCoords}
          pickUpAddress={pickUpAddress}
          setPickUpAddress={setPickUpAddress}
        />
        <LocationDropOff
          dropOffCoords={dropOffCoords}
          setDropOffCoords={setDropOffCoords}
          dropOffAddress={dropOffAddress}
          setDropOffAddress={setDropOffAddress}
        />
      </div>

      {selectedDrive && !isDriver ? (
       <div>
         <button
           className='btn rounded-full'
           disabled={disableConfirm}
           onClick={beDriver}>
           Confirm To Be Driver
         </button>

       </div>
     ) : ( ''
  )}

     {isDriver ? (
      <Link to='/riderequestlist'>
      <button className='btn rounded-full'>See Requested Rides</button>
    </Link>
    ) : ( ''
    )}

    {!selectedDrive && !isDriver ? (
       <Link to='/driverlist'>
         {' '} 
         <button className='btn rounded-full' onClick={findDriver}>
           Find Drivers
         </button>
       </Link>
     ) : ( ''
  )}
   </div>
  );
};

export default UserMap;
