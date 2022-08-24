import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { db } from "../firebase";
import { collection, query, where, serverTimestamp } from 'firebase/firestore';

function RiderDetails() {
  const user = useAuth()
  const ridesRef = collection(db, 'Rides');

  const findDrivers = () => {
    const currentTime = serverTimestamp()
    const drivers = query(ridesRef);
    console.log(drivers)

  }

  return (
    <div className="request-ride">
      <div className="request-ride__content">
        <div className="request-ride__container">
          <div className="request-ride__title">Ride Request</div>
          <div className="request-ride__close">
          </div>
        </div>
        <div className="request-ride__subtitle"></div>
        <div className="request-ride__form">
          <button className="request-ride__btn" onClick={findDrivers}>
            Find nearby Drivers
          </button>
        </div>
      </div>
    </div>
  );
}


export default RiderDetails;
