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
} from 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import { DriverContext } from '../driverContext';

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
  const { currentRide, setCurrentRide } = useContext(DriverContext);
  const { selectedDrive, userDistance, setUserDistance } = props;
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
    }).then((docRef) => {
      setCurrentRide(docRef.id);
    });

    updateDoc(doc(db, 'Users', userId), {
      driverStatus: true,
    });

    setIsDriver(true);
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

  console.log(isDriver, selectedDrive, currentRide, userDistance);

  return (
    <>
      {/* <div className='mx-auto'> */}
      <div className='container'>
        <MapContainer
          ref={mapRef}
          center={position}
          zoom={13}
          scrollWheelZoom
          className='border-2 flex items-center wx-auto'>
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
      <div
        className={
          selectedDrive
            // ? 'bg-gradient-to-t from-green-700 h-screen'
            // : 'bg-gradient-to-t from-green-200 h-screen'
        }>
        <button onClick={locateMe} className='m-3'>
          <svg
            height='28'
            viewBox='0 0 276 276'
            width='28'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M137.667,168.021 C154.404,168.021 168.021,154.404 168.021,137.667 C168.021,120.93 154.404,107.313 137.667,107.313 C120.93,107.313 107.313,120.93 107.313,137.667 C107.313,154.404 120.93,168.021 137.667,168.021 Z M137.667,119.313 C147.788,119.313 156.021,127.546 156.021,137.667 C156.021,147.788 147.788,156.021 137.667,156.021 C127.546,156.021 119.313,147.788 119.313,137.667 C119.313,127.546 127.546,119.313 137.667,119.313 Z'
              fill='#FB4A5E'
            />
            <path
              d='M269.334,131.667 L245.559,131.667 C242.544,76.849 198.485,32.79 143.667,29.775 L143.667,6 C143.667,2.687 140.98,0 137.667,0 C134.354,0 131.667,2.687 131.667,6 L131.667,35.605 C131.667,38.918 134.354,41.605 137.667,41.605 C190.636,41.605 233.729,84.698 233.729,137.667 C233.729,190.636 190.636,233.729 137.667,233.729 C84.698,233.729 41.605,190.636 41.605,137.667 C41.605,100.884 63.057,66.85 96.256,50.963 C99.245,49.532 100.509,45.95 99.078,42.961 C97.648,39.973 94.063,38.709 91.076,40.139 C72.945,48.815 57.603,62.356 46.71,79.297 C36.6,95.021 30.813,113.015 29.786,131.667 L6,131.667 C2.687,131.667 0,134.354 0,137.667 C0,140.98 2.687,143.667 6,143.667 L29.775,143.667 C32.79,198.485 76.849,242.544 131.667,245.559 L131.667,269.334 C131.667,272.647 134.354,275.334 137.667,275.334 C140.98,275.334 143.667,272.647 143.667,269.334 L143.667,245.559 C198.485,242.544 242.544,198.485 245.559,143.667 L269.334,143.667 C272.647,143.667 275.334,140.98 275.334,137.667 C275.334,134.354 272.647,131.667 269.334,131.667 Z'
              fill='#000000'></path>
          </svg>
        </button>
      </div>
      <div className='ml-4'>
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
        <div className='mx-4'>
          <Link to='/riderequestlist'>
          <button
             className='btn btn-outline bg-white mt-3'
             disabled={disableConfirm}
             onClick={beDriver}>
             Confirm To Be Driver
           </button>
         </Link>
        </div>
      ) : (
        ''
      )}

      {isDriver ? (
        <Link to='/riderequestlist'>
          <button className='btn rounded-full'>See Requested Rides</button>
        </Link>
      ) : (
        ''
      )}

      {!selectedDrive && !isDriver ? (
        <Link to='/driverlist'>
          {' '}
          <button
            className='btn btn-outline bg-white mt-3 mx-4'
            onClick={findDriver}>
            Find Drivers
          </button>
        </Link>
      ) : (
        ''
      )}
    </>
  );
};

export default UserMap;
