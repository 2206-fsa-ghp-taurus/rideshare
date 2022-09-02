import React, { useContext } from "react";
import {Link} from "react-router-dom";
import {useAuth} from "../auth";
import {auth} from "../firebase";
import {useHistory} from "react-router-dom";
import RequestNotification from './RequestNotification'
import { DriverContext } from '../driverContext';

const Navbar = () => {
  const {loggedIn} = useAuth();
  const history = useHistory();
  const { isDriver } = useContext(DriverContext);

  const handleLogOut = () => {
    auth.signOut();
    history.replace("/home"); // whenever user clicks on logout, always take them to the home apge
  };


  return (
    <>
      <nav role="navigation" style={{marginBottom: "120px"}}>
        {loggedIn ? (
          <div className="navbar bg-base-100">
            <div className="navbar-start">
              <div className="dropdown">
                <label tabIndex="0" className="btn btn-ghost btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex="0"
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    {" "}
                    <Link to="/home">Home</Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/userAccount">My Account</Link>
                  </li>
                  <li>
                    {" "}
                    <button onClick={handleLogOut}> Logout</button>
                  </li>
                </ul>
              </div>
            </div>
            <div class="navbar-end">
              { isDriver ?
              <Link to="/riderequestlist"><button class="indicator tab tab-lifted tab-active">Requests
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
          </div>
        ) : (
          <div className="navbar bg-base-100">
            <div className="navbar-start">
              <div className="dropdown">
                <label tabIndex="0" className="btn btn-ghost btn-circle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex="0"
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    {" "}
                    <Link to="/home">Home</Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/signup">Signup</Link>
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
