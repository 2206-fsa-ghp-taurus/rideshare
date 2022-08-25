import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../auth';
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link, Redirect } from 'react-router-dom';


function SelectRide() {
  const user = useAuth()
  const history = useHistory(); // sending users to other places

  const selectToRide = async () => {
    history.replace('/riderdetails');
  }

  const selectToDrive = async () => {
    await addDoc(collection(db, "Rides"), {
      driverId: user.userId,
      timestamp: serverTimestamp()
    })
    history.replace('/riderdetails'); // Update to send to driver input component
  }

  return (
    <div className="flex flex-col w-full border-opacity-50">
      <div className="grid h-20 card place-items-center">
        <button className="btn rounded-full" onClick={selectToRide}>I need a ride</button></div>
          <div className="divider">OR</div>
      <div className="grid h-20 card place-items-center">
        <button className="btn rounded-full" onClick={selectToDrive}>I want to drive</button></div>
      </div>
  );
}

export default SelectRide;
