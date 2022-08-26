import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { db } from "../firebase";
import { onSnapshot, collection, doc, updateDoc } from 'firebase/firestore';
import DriverDetails from './DriverDetails'

function DriverList() {
  const user = useAuth()
  const [Rides, setRides] = useState(["Rides"])

  useEffect(
    () =>
      onSnapshot(collection(db, "Rides"), async (snapshot) =>
        await setRides(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    ),
    []
      )
  )

  const requestRide = async (evt) => {
    const rideRef = doc(db, "Rides", `${evt.target.id}`);
    if (user) {
      await updateDoc(rideRef, {
        "riderId": user.userId,
        "status": 0,
        // "pickup": "",
        // "dropoff": "",
      });
    }
  };

  return (
    <div className='row col-8 justify-content-center'>
      {Rides.map((driver) => (
      <div className='card product-card shadow-lg'>
        <div className='card-body'>
          <p className='my-4 card-title product-name text-center font-weight-bold'>{driver.id} </p>
          <DriverDetails userId={driver.driverId} />
          <button className="btn rounded-full" id={driver.id} onClick={requestRide}>Request Ride</button>
        </div>
      </div>
      ))}
    </div>
  );
}


export default DriverList;
