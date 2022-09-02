import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import UserMap from './UserMap';
import { useAuth } from '../auth';
// import { db } from "../firebase";
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link, Redirect } from 'react-router-dom';
import Navbar from './Navbar';

function SelectRide(props) {
  const { loggedIn } = useAuth();
  const { selectedDrive, setSelectToDrive } = props;
  console.log(selectedDrive);

  if (!loggedIn) {
    return <Redirect to='/home' />;
  }

  const selectToDrive = () => {
    setSelectToDrive(true);
    console.log(selectedDrive);
  };
  const selectToRide = () => {
    setSelectToDrive(false);
  };

  return (
    <div className='h-screen'>
      <div className='btm-nav'>
        {/* <div className='grid h-20 card place-items-center'> */}
        <Link to='/userMap' className='bg-green-200'>
          <button className='active' onClick={selectToRide}>
            <img
              className='flex items-center h-5 w-5'
              src='https://www.svgrepo.com/show/307341/hail-a-cab-signal-hitchhike-wave.svg'
              alt='person'
              style={{ maxWidth: '25px' }}
            />
            <span className='btm-nav-label'>I need a ride</span>
          </button>
        </Link>
        {/* </div> */}
        {/* <div className='grid h-20 card place-items-center'> */}
        <Link to='/userMap' className='bg-green-700 text-white'>
          {' '}
          <button onClick={selectToDrive}>
            <img
              className='flex h-5 w-5'
              src='https://www.svgrepo.com/show/103353/car.svg'
              alt='car'
            />
            <span className='btm-nav-label'>I want to drive</span>
          </button>
        </Link>
        {/* </div> */}
      </div>
    </div>
  );
}

export default SelectRide;
