import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { db } from "../firebase";
import { collection, doc, updateDoc, query, where, onSnapshot } from 'firebase/firestore';
import UserDetails from './UserDetails'

function RideRequests() {
  const user = useAuth()
  const [rides, setRideRequests] = useState([])

  const getRideRequests = async () => {
    onSnapshot(query(collection(db, "Rides"), where("status", "==", 0), where("driverId", "==", `${user.userId}`)), async (snapshot) =>
    await  setRideRequests(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    ))
  }

  useEffect(
    () => {
      getRideRequests()
    }, []
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
    <div>
      {rides && rides.length !== 0 ?
        <div className='row col-8 justify-content-center'>
          {rides.map((requests) => (
          <div key={requests.id} className='card product-card shadow-lg'>
            <div className='card-body'>
              <p className='my-4 card-title product-name text-center font-weight-bold'>Requested Ride:</p>
              <UserDetails userId={requests.riderId} />
              <button className="btn rounded-full" id={requests.id} onClick={acceptRide}>Accept Ride</button>
            </div>
          </div>
          ))}
        </div>
        :
        <div>No rides requested</div>
      }
    </div>
  )
}

export default RideRequests;
