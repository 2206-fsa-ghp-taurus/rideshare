import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import UserMap from "./UserMap"
// import { useAuth } from '../auth';
// import { db } from "../firebase";
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function SelectRide(props) {
  // const user = useAuth()
  const {isDriver, setIsDriver} = props

  const selectToDrive = () => {
    // addDoc(collection(db, "Rides"), {
    //   driverId: user.userId,
    //   timestamp: serverTimestamp()
    // })
    setIsDriver(true)
    // return (<Route exact path="/selectride" render={() => <UserMap isDriver={isDriver}/>} />)
  }

  const selectToRide = () => {
    setIsDriver(false)
    // return (<Route path="/selectride" render={() => <UserMap isDriver={isDriver}/>} />)
  }



  return (
    <div className="flex flex-col w-full border-opacity-50">
      <div className="grid h-20 card place-items-center">
      <Link to="/home"><button className="btn rounded-full" onClick={selectToRide}>I need a ride</button></Link>
      </div>
          <div className="divider">OR</div>
      <div className="grid h-20 card place-items-center">
       <Link to="/home"> <button className="btn rounded-full" onClick={selectToDrive}>I want to drive</button></Link>
        </div>
      </div>
  );
}

export default SelectRide;
