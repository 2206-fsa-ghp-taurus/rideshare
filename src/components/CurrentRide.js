import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
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
  const [user, setCurrentUser] = useState([]);
  const [showChat, setShowChat] = useState(true);

  const getCurrentRide = async () => {
    if (isDriver) {
    onSnapshot(
      query(
        collection(db, 'Rides'),
        where('status', '==', 1),
        where('driverId', '==', `${userId}`)
      ),
      async (snapshot) =>
        await setCurrentRides(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        )
    );
    } else {
    onSnapshot(
      query(
        collection(db, 'Rides'),
        where('status', '==', 1),
        where('riderId', '==', `${userId}`)
      ),
      async (snapshot) =>
        await setCurrentRides(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        )
    );
    }
  };

  useEffect(() => {
    getCurrentRide();
  }, []);

  const cancelRide = async (evt) => {
    const rideRef = doc(db, 'Rides', `${evt.target.id}`);
    await updateDoc(rideRef, {
      status: deleteField(),
      riderId: deleteField(),
      riderPickUp: deleteField(),
      riderDropOff: deleteField(),
    });
  };
console.log(isDriver)
  const completeRide = async (evt) => {
    const rideRef = doc(db, 'Rides', `${evt.target.id}`);
    await updateDoc(rideRef, {
      status: 2,
      // add total cost / carbon footprint updates
    });
    // setIsDriver(false);
  };

  if (currentRides.length === 0) {
    return <p> Not currently on ride</p>;
  }

  console.log(isDriver);

  return currentRides.map((ride) => (
    <div key={ride.id}>
      {ride.driverId === userId ? (
        <div>
          <UserDetails userId={ride.riderId} />{' '}
          <button
            className='btn rounded-full'
            onClick={() => setShowChat(!showChat)}>
            {showChat ? 'Chat with Rider' : 'Hide Chat'}
          </button>
          {!showChat && (
            <Messaging
              id={ride.id}
              driverId={ride.driverId}
              riderId={ride.riderId}
              isDriver={true}
            />

          )}
            <Link to='/home'>
             <button id={ride.id} className="btn rounded-full" onClick = {completeRide}>Ride Complete</button>
           </Link>
        </div>
      ) : (
        <div>
          <UserDetails
            userId={ride.driverId}
            currentRide={ride.id}
            driverDetails={true}
          />
          <button
            className='btn rounded-full'
            onClick={() => setShowChat(!showChat)}>
            {showChat ? 'Chat with Driver' : 'Hide Chat'}
          </button>
          {!showChat && (
            <Messaging
              id={ride.id}
              driverId={ride.driverId}
              riderId={ride.riderId}
            />
          )}
          <button
            id={ride.id}
            className='btn rounded-full'
            onClick={cancelRide}>
            Cancel Ride
          </button>
        </div>
      )}
    </div>
  ));
}

export default CurrentRide;
