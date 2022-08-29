import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

function CurrentRide() {
  const { userId } = useAuth();
  const history = useHistory();
  const [currentRides, setCurrentRides] = useState([]);
  const [user, setCurrentUser] = useState([]);

  const getCurrentRide = async () => {
    onSnapshot(
      query(
        collection(db, 'Rides'),
        where('status', '==', 1),
        where('driverId', '==', `${userId}` || 'riderId', '==', `${userId}`)
      ),
      async (snapshot) =>
        await setCurrentRides(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        )
    );
  };

  const getCurrentUser = async () => {
    const userName = [];
    const docSnap = await getDoc(doc(db, 'Users', userId));
    userName.push(docSnap.data());
    setCurrentUser(userName);
  };

  useEffect(() => {
    getCurrentUser();
    getCurrentRide();
  }, []);

  const cancelRide = async (evt) => {
    const rideRef = doc(db, 'Rides', `${evt.target.id}`);
    await updateDoc(rideRef, {
      status: deleteField(),
      riderId: deleteField(),
      //remove  pick-up / drop-off details -- confirm key names
    });
    history.replace('/home');
  };

  if (currentRides.length === 0) {
    return <p> Not currently on ride</p>;
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
        </div>
      ) : (
        <div>
          <UserDetails
            userId={ride.driverId}
            currentRide={ride.id}
            isDriver={true}
          />
          <button
            id={ride.id}
            driverId={ride.driverId}
            riderId={ride.riderId}
            className='btn rounded-full'
            onClick={Messaging}>
            Chat with Driver
          </button>
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
