import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { db } from "../firebase";
import { onSnapshot, collection, query, where, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import DriverDetails from './DriverDetails'

function RiderDetails() {
  const user = useAuth()
  const [Rides, getRides] = useState(["Rides"])

  useEffect(
    () =>
      onSnapshot(collection(db, "Rides"), async (snapshot) =>
        await getRides(snapshot.docs.map((doc) => doc.data()))
    ),
    []
  )

  const requestRide = () => {

  };

  return (
    <div className='row col-8 justify-content-center'>
      {Rides.map((driver) => (
      <div className='card product-card shadow-lg'>
        <div className='card-body'>
          <p className='my-4 card-title product-name text-center font-weight-bold'>{driver.driverId} </p>
          <DriverDetails userId={driver.driverId} />
      <button className="btn rounded-full">Request Ride</button>
        </div>
      </div>
      ))}
    </div>
  );
}


export default RiderDetails;
