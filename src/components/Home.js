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
      <div className='ml-4 pt-3'>
        <h1
          className='text-8xl mx-4 pt-6 text-white font-extrabold'
          style={{ fontFamily: 'Twinkle Star' }}>
          hop
        </h1>
        {/* <h2 className='text-l mx-4 mt-7 text-white'>Hop In!</h2> */}
        <h2 className='text-m mx-4 text-white my-8 font-semibold'>
          A green rideshare company
        </h2>
      </div>
      <img
        className='mx-auto flex items-center'
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
