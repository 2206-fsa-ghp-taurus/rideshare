import React, { useState } from 'react';
import { useAuth } from '../auth';
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link, Redirect } from 'react-router-dom';


function SelectRide() {
  const user = useAuth()

  if (!user.loggedIn){
    return <Redirect to ='/Home' />
  }
  const selectToDrive = () => {
    addDoc(collection(db, "Rides"), {
      driverId: user.userId,
      timestamp: serverTimestamp()
    })
  }

  return (
    <div className="flex flex-col w-full border-opacity-50">
      <div className="grid h-20 card place-items-center">
        <button className="btn rounded-full">I need a ride</button></div>
          <div className="divider">OR</div>
      <div className="grid h-20 card place-items-center">
        <button className="btn rounded-full" onClick={selectToDrive}>I want to drive</button></div>
      </div>
  );
}

export default SelectRide;
