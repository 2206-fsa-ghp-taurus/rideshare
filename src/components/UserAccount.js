import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth';
import { auth, db } from '../firebase';
import { doc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const UserAccount = () => {
  const { userId } = useAuth();
  const [user, setUser] = useState({});
  const getUserInfo = () => {
    onSnapshot(doc(db, 'Users', userId), (doc) => {
      setUser(doc.data());
    });
  };
  useEffect(() => {
    getUserInfo();
  }, []); // so only sending request once

  const history = useHistory();
  const handleDelete = async () => {
    // delete entry in user table, also delete authentication
    await deleteDoc(doc(db, 'Users', userId));
    await deleteUser(auth.currentUser);
    window.alert('Account Deleted');
    history.replace('/home');
  };

  const FormatNumber = (num) => {
    // used to force wallet to be two digits
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const percent = user?.totalFootPrint / user?.goal;
  return (
    <>
      <div className='grid gap-6 mb-6 md:grid-cols-2'>
        {/* all users will have email, footprint and wallet except for the ones we manually added to auth*/}
        <div className='ml-6 mt-8'>
        <h3 className='text-center font-bold my-5'>User Info</h3>
          <div className="avatar">
            <div className="w-24 rounded">
              <img src={user?.pictureUrl} />
            </div>
          </div>

          <p className='my-1'>
            NAME: {user?.firstName} {user?.lastName}
          </p>
          <p className='my-1'>EMAIL: {user?.email}</p>
          <p className='my-1'>PHONE: {user?.phone}</p>
          <p className='my-1'>WALLET($): {FormatNumber(user?.wallet)}</p>
          <p className='my-1'>
            TOTAL CARBON FOOTPRINT: {user?.totalFootPrint} kg
          </p>
          <p className='my-1'>CARBON SAVING GOAL: {user?.goal} kg/year</p>
          <div className='flex items-center'>
            <p className='mr-2'>Progress towards carbon saving goal:</p>
            <progress
              className='progress progress-accent w-56'
              value={user?.totalFootPrint}
              max={user ? user.goal : 100}></progress>
          </div>



        </div>

        <div className='ml-6 mt-8'>
          <h3 className='text-center font-bold my-6'>Car Details</h3>
          <div className='ml-6'>
            <p className='my-1'>MAKE: {user?.carMake}</p>
            <p className='my-1'>MODEL: {user?.carModel}</p>
            <p className='my-1'>COLOR: {user?.carColor}</p>
            <p className='my-1'>LICENSE: {user?.carLicense}</p>
          </div>


      </div>
      </div>

      <div className='flex justify-center items-center my-5'>
          <Link to='/ridesHistory'>
          {' '}
            <button className='btn btn-outline btn-accent py-2 mx-auto'>See My Carbon Footprint</button>
          </Link>
        </div>

      <div className='flex justify-center items-center my-5'>
            <Link to='/editProfile'>
              <button className='btn btn-outline bg-success py-2 mx-auto'>Edit Profile</button>
            </Link>
          </div>

        <div className='flex justify-center items-center pt-5 mt-12'>
          <button
          className='btn btn-warning rounded-full mx-2'
          onClick={handleDelete}>
          {' '}
          Delete Account
            <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-trash'
            viewBox='0 0 16 16'>
            <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
            <path
              fillRule='evenodd'
              d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
            />
            </svg>
          </button>
        </div>
    </>
  );
};
export default UserAccount;
