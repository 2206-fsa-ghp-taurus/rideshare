import React, { useState } from 'react';
import UserMap from './UserMap';
import { useAuth } from '../auth';
import { Redirect } from 'react-router-dom';
import CarbonSaved from './CarbonSaved';

function SelectRide(props) {
  const { loggedIn } = useAuth();
  const { selectedDrive, setSelectToDrive } = props;
  const [decide, setDecide] = useState(false);

  if (!loggedIn) {
    return <Redirect to='/home' />;
  }

  const selectToDrive = () => {
    setSelectToDrive(true);
    setDecide(true);
  };
  const selectToRide = () => {
    setSelectToDrive(false);
    setDecide(true);
  };

  return (
    <div className='h-fit wx-auto px-0'>
      {decide ? <UserMap selectedDrive={selectedDrive} /> : <CarbonSaved />}
      <div className='btm-nav'>
        <button className='bg-green-100' onClick={selectToRide}>
          <img
            className='flex items-center h-5 w-5'
            src='https://www.svgrepo.com/show/307341/hail-a-cab-signal-hitchhike-wave.svg'
            alt='person'
            style={{ maxWidth: '25px' }}
          />
          <span className='btm-nav-label'>I need a ride</span>
        </button>
        <button
          onClick={selectToDrive}
          className={'bg-green-700 bg-opacity-40 text-white'}>
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
