import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../auth';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const DEFAULTimg =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR7TEM9d91DuHZgbmbtlx4tlSl-FJQKvREDA&usqp=CAU';
const Signup = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleSignUp = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ); // create user
      console.log('new user credential', credential);
      // before firebase 9: db.collection().doc().set
      await setDoc(doc(db, 'Users', credential.user.uid), {
        email: credential.user.email,
        totalFootPrint: 0,
        wallet: 100, // virtual wallet, give an initial value of 100
        pictureUrl: DEFAULTimg,
      });
    } catch (error) {
      setStatus({ loading: false, error: true });
      console.log('error:', error);
    }
  };

  if (loggedIn) {
    return <Redirect to='/createProfile' />;
  }
  return (
    <div className='form-control h-screen flex items-center justify-center my-4'>
      <h1
        className='text-8xl mx-4 mb-2 text-green-400 font-extrabold'
        f
        style={{ fontFamily: 'Twinkle Star' }}>
        hop
      </h1>
      <h2 className='text-center text-xl font-semibold my-2'>Sign Up</h2>
      <div>
        <label className='input-group input-group-md'>
          <span> Email</span>
        </label>
        <input
          className='input input-bordered input-lg mb-3 py-2'
          type='email'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label className='input-group input-group-md'>
          <span> Password </span>
        </label>
        <input
          className='input input-bordered input-lg mb-3 py-2'
          type='password'
          value={password}
          placeholder='6 digits or longer'
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {/* error message  */}
      {status.error && <p>Registration failed</p>}
      {/* handle register */}
      <div className='btn-group-vertical'>
        <button
          onClick={handleSignUp}
          className='btn btn-outline bg-success flex items-center py-3 mt-2 mb-4 mx-auto'>
          {' '}
          Create Account{' '}
        </button>
        <div className='flex items-center'>
          <p className='mr-2'>Have an account?</p>
          <Link to='/login' className='btn'>
            Log In
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

export default Signup;
