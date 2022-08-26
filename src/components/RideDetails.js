import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { db } from "../firebase";
import { collection, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
// import DriverDetails from './DriverDetails'

function RideDetails() {
  const user = useAuth()
  const [RideRequests, setRideRequests] = useState(["Rides"])

  useEffect(
    () => {
      const q = query(collection(db, "Rides"), where("status", "==", 0), where("driverId", "==", `${user.userId}`));

      const querySnapshot = getDocs(q);
      querySnapshot.forEach((doc) => {
      setRideRequests({id: doc.id, ...doc.data()});
      });
      []
    }
  )


  const acceptRide = async (evt) => {
    const rideRef = doc(db, "Rides", `${evt.target.id}`);
    if (user) {
      await updateDoc(rideRef, {
        "status": 1,
      });
    }
  };

  return (
    <div className='row col-8 justify-content-center'>
      {RideRequests.map((requests) => (
      <div className='card product-card shadow-lg'>
        <div className='card-body'>
          <p className='my-4 card-title product-name text-center font-weight-bold'>{requests.id} </p>
          {/* <DriverDetails userId={driver.driverId} /> */}
          <button className="btn rounded-full" onClick={acceptRide}>Request Ride</button>
        </div>
      </div>
      ))}
    </div>
  );
}


export default RideDetails;
