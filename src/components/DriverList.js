import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth';
import { db } from "../firebase";
import { onSnapshot, collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import UserDetails from './UserDetails'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const DriverList = (props)=> {
  const {userId} = useAuth();
  const history = useHistory();
  const [rides, setRides] = useState([]) // rides have all the drivers
  const matchingDriver = []
  const [pickUpCoords, setPickUpCoords] = useState({}); // this is for the current rider
  const [dropOffCoords, setDropOffCoords] = useState({});// this is for the current rider
  const [distance, setDistance] = useState(0)
  const [pickUpAddress, setPickUpAddress] = useState("");
  const [dropOffAddress, setDropOffAddress] = useState("");
  const [firstName, setUserName] = useState('')
  const [pictureUrl, setPictureUrL] = useState('')

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
      setDistance(doc.data().distanceTravelled) // need to save distanc einformation for each ride
      setPickUpAddress(doc.data().pickUpAddress);
      setDropOffAddress(doc.data().dropOffAddress);
      setUserName(doc.data().firstName);
      setPictureUrL(doc.data().pictureUrl)
    })
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  const requestRide = async (rideId)=> {
    let requestors = []
    const rideRef = doc(db, "Rides", rideId);
    const ride = (await getDoc(rideRef)).data()

      if(ride.requestorIds) {
        requestors = ride.requestorIds
        requestors.push({userId, firstName, pictureUrl, pickUpCoords, dropOffCoords, distance, pickUpAddress, dropOffAddress})
      } else {
        requestors.push({userId, firstName, pictureUrl, pickUpCoords, dropOffCoords, distance, pickUpAddress, dropOffAddress})
      }

      if (userId) {
        await updateDoc(rideRef, {
          "requestorIds": requestors,
          "status": 0,
        });
      }
  };

  for (let idx = 0; idx< rides.length; idx++){
    if (Math.abs(pickUpCoords.lat - rides[idx].driverPickUp.lat)<0.05 && Math.abs(pickUpCoords.lng - rides[idx].driverPickUp.lng)<0.05 &&
      Math.abs(dropOffCoords.lat - rides[idx].driverDropOff.lat)<0.05 && Math.abs(dropOffCoords.lng - rides[idx].driverDropOff.lng)<0.05 && !rides[idx].status){
      matchingDriver.push(rides[idx])
    }
  }
  console.log(matchingDriver)

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
          <UserDetails userId={driver.driverId} />
          <Link to = {{ pathname: "/currentRide", state: {ride :driver}}}><button className="btn rounded-full" onClick={()=>requestRide(driver.id)}>Request Ride</button></Link>
        </div>
      </div>
      ))}
    </div>
  );
}


export default DriverList;
