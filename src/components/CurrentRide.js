import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { db } from '../firebase';
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  deleteField,
} from 'firebase/firestore';
import UserDetails from './UserDetails';
import Messaging from './Messaging';

function CurrentRide(props) {
  const { userId } = useAuth();
  const { isDriver, setIsDriver } = props;
  const [currentRides, setCurrentRides] = useState([]);

  const getCurrentRide= async () => {
    if (isDriver) {
      onSnapshot(
        query(
          collection(db, "Rides"),
          where("status", "==", 1),
          where("driverId", "==", `${userId}`)
        ),
        async (snapshot) =>
          await setCurrentRides(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
        )
    } else {
        onSnapshot(
          query(
            collection(db, "Rides"),
            where("status", "==", 1),
            where("riderId", "==", `${userId}`)
          ),
          async (snapshot) =>
            await setCurrentRides(
              snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            )
        )
    }
  }


  useEffect(() => {
    getCurrentRide();
  }, []);

  const cancelRide = async (evt) => {
    const rideRef = doc(db, "Rides", `${evt.target.id}`);
    await updateDoc(rideRef, {
      "status": deleteField(),
      "riderId": deleteField(),
      "riderPickUp": deleteField(),
      "riderDropOff": deleteField()
    })
  }

  const completeRide = async (evt) => {
    const rideRef = doc(db, "Rides", `${evt.target.id}`);
    await updateDoc(rideRef, {
      "status": 2,
      // add total cost / carbon footprint updates
    })
    // setIsDriver(false);
  }



  if (currentRides.length === 0){
    return (
      <p> Not currently on ride</p>
    )
  }

  return currentRides.map((ride) => (
    <div>
      {ride.driverId === userId ? (
        <div>
          <UserDetails userId={ride.riderId} />
          <button
            id={ride.id}
            driverId={ride.driverId}
            riderId={ride.riderId}
            className='btn rounded-full'
            onClick={Messaging}>
            Chat with Rider
          </button>
          <Link to='/home'>
             <button id={ride.id} className="btn rounded-full" onClick = {completeRide}>Ride Complete</button>
           </Link>
        </div>
      ) : (
        <div>
          <UserDetails
            userId={ride.driverId}
            currentRide={ride.id}
            isDriver={isDriver}
          />
          <button
            id={ride.id}
            driverId={ride.driverId}
            riderId={ride.riderId}
            className='btn rounded-full'
            onClick={Messaging}>
            Chat with Driver
          </button>
          <Link to='/home'>
          <button
            id={ride.id}
            className='btn rounded-full'
            onClick={cancelRide}>
            Cancel Ride
          </button>
          </Link>
        </div>
      )}
    </div>
  ));
}

export default CurrentRide;
