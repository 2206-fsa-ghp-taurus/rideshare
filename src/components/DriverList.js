import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { db } from "../firebase";
import { onSnapshot, collection, doc, updateDoc } from 'firebase/firestore';
import UserDetails from './UserDetails'


const DriverList = ()=> {
  const {userId} = useAuth();
  const [rides, setRides] = useState([]) // rides have all the drivers 
  const  matchingDriver = []
  const  [pickUpCoords, setPickUpCoords] = useState({}); // this is for the current rider 
  const  [dropOffCoords, setDropOffCoords] = useState({});// this is for the current rider 

  // first get all drivers from database
  const getRides = async () => {
    onSnapshot(collection(db, "Rides"), async (snapshot) =>
      await setRides(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    ))
  }

   useEffect(() => {
    getRides()
  }, [])

  const getCurrentUser = () =>{
    onSnapshot(doc(db, 'Users', userId), (doc)=> {
      setPickUpCoords(doc.data().pickUp);
      setDropOffCoords (doc.data().dropOff);
    })
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  const requestRide = async (evt) => {
    const rideRef = doc(db, "Rides", `${evt.target.id}`);
    if (userId) {
      await updateDoc(rideRef, {
        "riderId": userId,
        "status": 0,
        "riderPickUp": pickUpCoords,
        "riderDropOff": dropOffCoords,
      });
    }
  };

  console.log('for this requester, pick up and drop off', pickUpCoords, dropOffCoords)
  console.log('all Drivers', rides)

  for (let idx = 0; idx< rides.length; idx++){
    if (Math.abs(pickUpCoords.lat - rides[idx].driverPickUp.lat)<0.05 && Math.abs(pickUpCoords.lng - rides[idx].driverPickUp.lng)<0.05&&
      Math.abs(dropOffCoords.lat - rides[idx].driverDropOff.lat)<0.05 && Math.abs(dropOffCoords.lng - rides[idx].driverDropOff.lng)<0.05 && !rides[idx].status){
      matchingDriver.push(rides[idx])
    }
    console.log('matching drivers', matchingDriver)
  }

  if (matchingDriver.length === 0){
    return (
      <p> No Driver Found</p>
    )
  }
  return (
    <div className='row col-8 justify-content-center'>
      {matchingDriver.map((driver) => (
      <div key={driver.driverId} className='card product-card shadow-lg'>
        <div className='card-body'>
          <p className='my-4 card-title product-name text-center font-weight-bold'>{driver.driverId} </p>
          <UserDetails userId={driver.driverId} />
          <button className="btn rounded-full" onClick={requestRide}>Request Ride</button>
        </div>
      </div>
      ))}
    </div>
  );
}


export default DriverList;
