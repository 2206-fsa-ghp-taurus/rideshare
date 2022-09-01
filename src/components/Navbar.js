import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
  const { loggedIn } = useAuth();
  const history = useHistory();

  const handleLogOut = () => {
    auth.signOut();
    history.replace('/home'); // whenever user clicks on logout, always take them to the home apge
  };

  return (
    <>
      <nav role='navigation'>
        {loggedIn ? (
          <div className='navbar bg-base-100 '>
            <div className='navbar-start'>
              <div className='dropdown'>
                <label tabIndex='0' className='btn btn-ghost btn-circle'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6h16M4 12h16M4 18h7'
                    />
                  </svg>
                </label>
                <ul
                  tabIndex='0'
                  className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'>
                  <li>
                    {' '}
                    <Link to='/home'>Home</Link>
                  </li>
                  <li>
                    {' '}
                    <Link to='/userAccount'>My Account</Link>
                  </li>
                  <li>
                    {' '}
                    <button onClick={handleLogOut}> Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className='navbar bg-base-100 bg-green-400'>
            <div className='navbar-start'>
              <div className='dropdown'>
                <label tabIndex='0' className='btn btn-ghost btn-circle'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      stroke-width='2'
                      d='M4 6h16M4 12h16M4 18h7'
                    />
                  </svg>
                </label>
                <ul
                  tabIndex='0'
                  className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'>
                  <li>
                    {' '}
                    <Link to='/home'>Home</Link>
                  </li>
                  <li>
                    {' '}
                    <Link to='/login'>Login</Link>
                  </li>
                  <li>
                    {' '}
                    <Link to='/signup'>Signup</Link>
                  </li>
                </ul>
              </div>
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
