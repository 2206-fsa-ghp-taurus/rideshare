import React, { useEffect, useState } from 'react';
import { useHistory} from 'react-router-dom';
import { useAuth } from '../auth';
import { db } from "../firebase";
import { collection, doc, updateDoc, query, where, onSnapshot } from 'firebase/firestore';
import UserDetails from './UserDetails'

function RideRequests() {
  const {userId} = useAuth()
  const history = useHistory()
  const [requests, setRideRequests] = useState([])

  const getRideRequests = async () => {
    onSnapshot(query(collection(db, "Rides"), where("status", "==", 0), where("driverId", "==", `${userId}`)), async (snapshot) =>
    await  setRideRequests(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
    ))
  }

  useEffect(() => {
    getRideRequests()
  }, [])

  const acceptRide = async (evt) => {
    // if (requests.length > 1) {
    //   requests
    //   .filter((request) => request.id !== evt.target.id)
    //   .map((request) => )
    // }
    const rideRef = doc(db, "Rides", `${evt.target.id}`);
    await updateDoc(rideRef, {
      "status": 1,
    });

    // history.replace('/editProfile'); update to send to current ride component
  }

  const inputCarDetails = async () => {
    history.replace('/editProfile');
  }

  return (
    <div>
      {requests && requests.length !== 0 ?
        <div className='row col-8 justify-content-center'>
          {requests.map((request) => (
          <div key={request.id} className='card product-card shadow-lg'>
            <div className='card-body'>
              <p className='my-4 card-title product-name text-center font-weight-bold'>Requested Ride:</p>
              <UserDetails userId={request.riderId} />
              <button className="btn rounded-full" id={request.id} onClick={acceptRide}>Accept Ride</button>
            </div>
          </div>
          ))}
        </div>
        :
        <div>No rides requested</div>
      }
       <div className="divider"></div>
      <div>
      <h4>Would you like to update your car details?</h4>
      <button className="btn rounded-full" onClick = {inputCarDetails}>Edit Car Details</button>
      </div>
    </div>
  )
}

export default RideRequests;
