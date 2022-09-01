import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../auth';

const Home = () => {
  const { loggedIn } = useAuth();
  if (loggedIn) {
    return <Redirect to='/selectRide' />;
  }
  return (
    <div className='bg-gradient-to-b from-green-400 h-screen'>
      <h1 className='text-4xl mx-4 pt-6 body-font font-lobster'>hop</h1>
      <h2 className='text-l mx-4 my-2'>Hop In!</h2>
      <p className='text-m mx-4'>A green rideshare company</p>
      <img
        className='mx-auto flex items-center my-4'
        src='https://www.irishtimes.com/resizer/EewJJaHC1jAzGGTpXUrjQMDPc-Y=/1440x0/filters:format(png):quality(70)/cloudfront-eu-central-1.images.arcpublishing.com/irishtimes/WUHKSRNMD7MDWVN6IO3WPAMTBY.png'
        alt='background pic'
      />
      <div className='flex items-center justify-center my-4'>
        <Link to='/login' className='btn btn-outline bg-success mx-2'>
          Login
        </Link>
        <Link to='/signup' className='btn btn-outline bg-success mx-2'>
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default Home;
