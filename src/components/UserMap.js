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
  const [pickUpAddress, setPickUpAddress] = useState("");
  const [dropOffAddress, setDropOffAddress] = useState("");
  const {isDriver, setIsDriver} = useContext(DriverContext);
  const {currentRide, setCurrentRide} = useContext(DriverContext);
  const {selectedDrive} = props;
  const [disableConfirm, setDisableConfirm] = useState(false);
  const { userId } = useAuth();
  const location = UseGeolocation();
  const mapRef = useRef();
  const [userDistance, setUserDistance] = useState();

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

  console.log('userDistance', userDistance)

  const locateMe = () => {
    mapRef.current.flyTo([location.coordinates.lat, location.coordinates.lng]);
  };

  return (
    <div className='w-full'>
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
            userDistance={userDistance}
            setUserDistance={setUserDistance}
          />
        </MapContainer>
      </div>
      <div
        className={
          selectedDrive
            ? 'bg-gradient-to-t from-green-700 h-screen'
            : 'bg-gradient-to-t from-green-200 h-screen'
        }>
        <div>
          <button onClick={locateMe} className='m-3'>
            <svg
              class='h-6 w-6 text-black'
              viewBox='0 0 24 24'
              fill='nonzero'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'>
              {' '}
              <polygon points='3 11 22 2 13 21 11 13 3 11' />
            </svg>
          </button>
        </div>
        <div className='mx-3 my-2'>
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
            <button className='btn btn-accent mx-3'>See Requested Rides</button>
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
      </div>
    </div>
  );
};

export default UserMap;
