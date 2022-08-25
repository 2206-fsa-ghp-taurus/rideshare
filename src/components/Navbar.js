import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth';
import { auth } from '../firebase';


const Navbar = () => {
    const { loggedIn } = useAuth();
    // console.log('navbar', loggedIn)
    return (
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
                <Link to='/signup'>Sign Up</Link>
                </div>
            )}
            </nav>
  </>
    )
};

export default Navbar;