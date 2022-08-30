// // will render different thing based on isDriver or not 
// // adding money for driver, reducing money for rider (also updating footprint for rider)
import React, {useState, useEffect} from 'react';
import { useAuth } from '../auth';
import { db } from '../firebase';
import { doc, onSnapshot} from "firebase/firestore"


const RideComplete = () => {
  const { userId } = useAuth();
//   const [firstName, setFirstName] = useState('')
  const [userTravelInfo, setUserTravelInfo ] = useState({})
  const getUserInfo = () => {onSnapshot(doc(db, 'Users', userId), (doc) =>{
    setUserTravelInfo(doc.data());
})}
useEffect(()=>{getUserInfo()}, []) // so only sending request once

const FormatNumber = (num)=> {
    return (Math.round(num * 100) / 100).toFixed(2);
  }
  return (
    <div>
      <h1> {`Hi ${userTravelInfo.firstName}, Here is the summary of your ride` }</h1>
        <p> Distance (km): {FormatNumber(userTravelInfo.distanceTravelled/1000)}</p>
        <p> Cost ($): {FormatNumber(userTravelInfo.distanceTravelled/1000 * 0.621371 * 0.585)}</p>
        {/* m to km, to miles, 58.5 cents for IRS reimbursement rate */}
        <p> Carbon Saved(gram) : {FormatNumber(userTravelInfo.distanceTravelled/1000 * 650)}</p>
    </div>
  );
};

export default RideComplete;
