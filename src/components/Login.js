import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../auth';
import { auth } from '../firebase'; // import the auth service
import { signInWithEmailAndPassword } from 'firebase/auth'; // for firebase 9, signinwithemailandpwd is not on auth

const Login = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleLogin = async () => {
    try {
      setStatus({ loading: true, error: false }); // start loading
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('user credential:', credential);
    } catch (error) {
      setStatus({ loading: false, error: true }); // error
      console.log('error:', error);
    }
  };

  if (loggedIn) {
    return <Redirect to='/selectRide' />;
  }

  return (
    <div className='form-control h-screen flex items-center justify-center my-4'>
      <h1
        className='text-8xl mx-4 mb-2 text-green-400 font-extrabold'
        style={{ fontFamily: 'Twinkle Star' }}>
        hop
      </h1>
      <h2 className='text-center text-xl font-semibold my-2'>Log In</h2>
      <div>
        <label className='input-group input-group-md'>
          <span> Email</span>
        </label>
        <input
          className='input input-bordered input-lg py-2 mb-3'
          type='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label className='input-group input-group-md'>
          <span> Password</span>
        </label>
        <input
          className='input input-bordered input-lg py-2 mb-3'
          type='password'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {/* if error , show the error message */}
      {status.error && <p> Invalid email / password</p>}

      {/* login button */}
      <div className='btn-group-vertical'>
        <button
          onClick={handleLogin}
          className='btn btn-outline bg-success flex items-center py-3 mt-2 mb-3 mx-auto'>
          Login
        </button>
        <div className='flex items-center'>
          <p className='mr-2'>Not a member?</p>
          <Link to='/signup' className='btn hover:bg-gray-300 mx-2'>
            {' '}
            Sign Up{' '}
          </Link>
        </div>
      </div>

      {/* loading message */}
      {status.loading ? (
        <div className='flex justify-center items-center'>
          <div
            className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'
            role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Login;
