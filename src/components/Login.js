import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../auth';
import { auth, db} from '../firebase'; // import the auth service
import {signInWithEmailAndPassword} from "firebase/auth" // for firebase 9, signinwithemailandpwd is not on auth

const Login = () => {
  const { loggedIn, userId } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleLogin = async () => {
    try {
      setStatus({ loading: true, error: false }); // start loading
      const credential = await signInWithEmailAndPassword(auth, email, password);
      console.log('user credential:', credential);
    } catch (error) {
      setStatus({ loading: false, error: true }); // error
      console.log('error:', error);
    }
  };

  if (loggedIn) {
    return <Redirect to ='/selectRide' />
    // return (
    //     <div>
    //         <p> Success - Placeholder Message</p>
    //     </div>
    // )

  }
  return (
    <div className= 'form-control'>
          <div>
            <label className="input-group input-group-lg" >
                 <span> Email</span>
            </label>
            <input className="input input-bordered input-lg" type="email" value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label className="input-group input-group-lg" >
                 <span> Password</span>
            </label>
            <input className="input input-bordered input-lg" type="password" value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

{/* if error , show the error message */}
        {status.error &&
          <p> Invalid email / password</p>
        }

{/* login button */}
        <div className="btn-group">
          <button onClick={handleLogin} className="btn btn-active">Login</button>
          <Link to="/signup" className="btn"> Don't have an account yet? Sign Up </Link>
        </div>

  {/* loading message */}
        {status.loading ?
        <div className="flex justify-center items-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
       </div>
    : ''}

    </div>
  );
};

export default Login;
