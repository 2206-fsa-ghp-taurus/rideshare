import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { db } from "../firebase";
import { onSnapshot, collection, doc, updateDoc } from 'firebase/firestore';
import DriverDetails from './DriverDetails'


const DriverList = ()=> {
  const {userId} = useAuth();
  const [rides, setRides] = useState([]) // rides have all the drivers 
  const matchingDriver = []
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
      setPickUpCoords(doc.data().riderPickUp);
      setDropOffCoords (doc.data().riderDropOff);
    })
  }

  useEffect(() => {
    getCurrentUser()
  }, [])


  // const requestRide = async (evt) => {
  //   const rideRef = doc(db, "Rides", `${evt.target.id}`);
  //   if (user) {
  //     await updateDoc(rideRef, {
  //       "riderId": userId,
  //       "status": 0,
  //       // "pickup": "",
  //       // "dropoff": "",
  //     });
  //   }
  // };

  console.log('for this requester, pick up and drop off', pickUpCoords, dropOffCoords)
  console.log('all Drivers', rides)

  for (let idx = 0; idx< rides.length; idx++){
    if (Math.abs(pickUpCoords.lat - rides[idx].pickUp.lat)<0.1 && Math.abs(pickUpCoords.lng - rides[idx].pickUp.lng)<0.1&&
      Math.abs(dropOffCoords.lat - rides[idx].dropOff.lat)<0.1 && Math.abs(dropOffCoords.lng - rides[idx].dropOff.lng)<0.1){
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


export default DriverList;