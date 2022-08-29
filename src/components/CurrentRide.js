import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth';
import { db } from "../firebase";
import { collection, doc, getDoc, updateDoc, query, where, onSnapshot, deleteField, getDocs } from 'firebase/firestore';
import UserDetails from './UserDetails'

function CurrentRide(props) {
  const {userId} = useAuth()
  const history = useHistory()
  const { isDriver } = props;
  const [currentRides, setCurrentRides] = useState([])
  const [user, setCurrentUser] = useState([])

  const getCurrentRide= async () => {
    if(isDriver) {
      onSnapshot(query(collection(db, "Rides"), where("status", "==", 1), where("driverId", "==", `${userId}`)), async (snapshot) =>
        await setCurrentRides(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
      ))
    } else {
      onSnapshot(query(collection(db, "Rides"), where("status", "==", 1), where("riderId", "==", `${userId}`)), async (snapshot) =>
        await setCurrentRides(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
      ))
    }
  }

  const getCurrentUser = async () => {
    const userName = []
    const docSnap = await getDoc(doc(db, "Users",
      userId));
      userName.push(docSnap.data());
      setCurrentUser(userName)
    }

  useEffect(() => {
    getCurrentUser()
    getCurrentRide()
  }, [])

  const cancelRide = async (evt) => {
    const rideRef = doc(db, "Rides", `${evt.target.id}`);
    await updateDoc(rideRef, {
      "status": deleteField(),
      "riderId": deleteField()
      //remove  pick-up / drop-off details -- confirm key names
    })
    history.replace('/home');;
  }

  console.log(currentRides)

if (currentRides.length === 0){
  return (
    <p> Not currently on ride</p>
  )
}

  return (
    currentRides.map((ride) => (
      <div>
        {ride.driverId === userId ?
          <div>
            <UserDetails userId={ride.riderId} />
          </div>
        :
          <div>
            <UserDetails userId={ride.driverId} currentRide={ride.id}/>
            <button id={ride.id} className="btn rounded-full" onClick = {cancelRide}>Cancel Ride</button>
          </div>
        }
      </div>
    ))
  )
}



export default CurrentRide
