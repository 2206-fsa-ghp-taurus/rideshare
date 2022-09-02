import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import UserMap from './UserMap';
import { useAuth } from '../auth';
// import { db } from "../firebase";
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link, Redirect } from 'react-router-dom';
import CarbonSaved from './CarbonSaved';

function SelectRide(props) {
  const { loggedIn } = useAuth();
  const { selectedDrive, setSelectToDrive } = props;
  const [decide, setDecide] = useState(false);
  console.log(selectedDrive);

  if (!loggedIn) {
    return <Redirect to='/home' />;
  }

  const selectToDrive = () => {
    setSelectToDrive(true);
    setDecide(true);
    console.log(selectedDrive);
  };
  const selectToRide = () => {
    setSelectToDrive(false);
    setDecide(true);
  };

  return (
    <div className='h-screen'>
      {decide ? <UserMap selectedDrive={selectedDrive} /> : <CarbonSaved />}
      <div className='btm-nav'>
        <button className='bg-green-200' onClick={selectToRide}>
          <img
            className='flex items-center h-5 w-5'
            src='https://www.svgrepo.com/show/307341/hail-a-cab-signal-hitchhike-wave.svg'
            alt='person'
            style={{ maxWidth: '25px' }}
          />
          <span className='btm-nav-label'>I need a ride</span>
        </button>
        <button className='bg-green-700 text-white' onClick={selectToDrive}>
          <img
            className='flex h-5 w-5'
            src='https://www.svgrepo.com/show/103353/car.svg'
            alt='car'
          />
          <span className='btm-nav-label'>I want to drive</span>
        </button>
      </div>
    </div>
  );
}

export default SelectRide;
