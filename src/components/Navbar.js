import React, { useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { auth, db } from '../firebase';
import { useHistory } from 'react-router-dom';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import RequestNotification from './RequestNotification'
import {DriverContext} from '../driverContext'

const Navbar = () => {
  const { loggedIn, userId } = useAuth();
  const history = useHistory();
  const [userPhoto, setUserPhoto] = useState('');
  const {isDriver} = useContext(DriverContext)

  const handleLogOut = () => {
    auth.signOut();
    history.replace('/home'); // whenever user clicks on logout, always take them to the home apge
  };

  const getPhoto = async () => {
    let grabPhoto = await onSnapshot(doc(db, 'Users', userId), doc =>
      setUserPhoto(doc.data().pictureUrl));
  };

  useEffect(() => {
    getPhoto();
  });

  return (
    <>
      <nav role='navigation' className='bg-green-400 bg-opacity-40'>
        {loggedIn && (
          <div className='navbar w-full'>
            <div className='navbar-start'>
                <Link to='/home'>
                <p
                  className='text-3xl mx-3 text-white font-extrabold'
                  style={{ fontFamily: 'Twinkle Star' }}>
                  hop
                </p>
                </Link>
                { isDriver ?
              <Link to="/riderequestlist"><button class="indicator tab tab-lifted tab-active">Ride Requests
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg> */}
                  <span class="indicator-item badge"><RequestNotification /></span>
              </button></Link>
              : ""
                }
              </div>

        <div className='navbar-end'>
            <label
              tabIndex='0'
              className='btn btn-ghost btn-circle avatar online'>
              <div className='rounded-full w-10'>
                <Link to='/userAccount'>
                  <img src={userPhoto} alt='user pic'/>
                </Link>
              </div>
            </label>
            <label tabIndex='0' className='mx-2 flex items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-box-arrow-right'
                viewBox='0 0 16 16'>
                <path
                  fillRule='evenodd'
                  d='M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z'
                />
                <path
                  fillRule='evenodd'
                  d='M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'
                />
              </svg>
              <button onClick={handleLogOut} className='mx-1'> Logout</button>
            </label>
          </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;

/* simple navar code
 <>
            <nav role='navigation' classNameName='navbar sticky-top'>
            {loggedIn ? (
                <div >
                <Link to='/home'>Home</Link>
                <button onClick = {()=> auth.signOut()}> Logout</button>
                </div>
            ) : (
                <div>
                <Link to='/home'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>SignUp</Link>
                </div>
            )}
            </nav>
  </>
*/
