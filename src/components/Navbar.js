import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom'; 


const Navbar = () => {
    const { loggedIn } = useAuth();
    const history = useHistory();

    const handleLogOut = () =>{
      auth.signOut();
      history.replace('/home') // whenever user clicks on logout, always take them to the home apge 
    }

    return (
        <>
            <nav role='navigation' style = {{marginBottom : '100px'}}>
            {loggedIn ? (
                <div class="navbar bg-base-100">
                <div class="navbar-start">
                  <div class="dropdown">
                    <label tabindex="0" class="btn btn-ghost btn-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a>  <Link to='/home'>Home</Link></a></li>
                      <li><a>  <Link to='/myAccount'>My Account</Link></a></li>
                      <li><a>  <button onClick = {handleLogOut} > Logout</button></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
                <div class="navbar bg-base-100">
                <div class="navbar-start">
                  <div class="dropdown" >
                    <label tabindex="0" class="btn btn-ghost btn-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                      <li><a>    <Link to='/home'>Home</Link></a></li>
                      <li><a>    <Link to='/login'>Login</Link></a></li>
                      <li><a>    <Link to='/signup'>Signup</Link></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            </nav>
  </>
    )
};

export default Navbar;


/* simple navar code 
 <>
            <nav role='navigation' className='navbar sticky-top'>
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