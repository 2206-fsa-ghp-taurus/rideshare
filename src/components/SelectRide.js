import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import UserMap from './UserMap';
import { useAuth } from '../auth';
// import { db } from "../firebase";
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link, Redirect } from 'react-router-dom';

function SelectRide(props) {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    return <Redirect to='/home' />;
  }
  const { isDriver, setIsDriver } = props;

  const selectToDrive = () => {
    setIsDriver(true);
  };
  const selectToRide = () => {
    setIsDriver(false);
  };

  return (
    <div className='flex flex-col w-full border-opacity-50'>
      <div className='grid h-20 card place-items-center'>
        <Link to='/userMap'>
          <button className='btn rounded-full' onClick={selectToRide}>
            I need a ride
          </button>
        </Link>
      </div>
      <div className='divider'>OR</div>
      <div className='grid h-20 card place-items-center'>
        <Link to='/userMap'>
          {' '}
          <button className='btn rounded-full' onClick={selectToDrive}>
            I want to drive
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SelectRide;
