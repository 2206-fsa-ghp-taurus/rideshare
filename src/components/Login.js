import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../auth';
import { auth} from '../firebase'; // import the auth service
import {signInWithEmailAndPassword} from "firebase/auth" // for firebase 9, signinwithemailandpwd is not on auth
console.log('auth from firebase', auth)

const Login = () => {
  const { loggedIn } = useAuth();
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
    <div>
          <div>
            <label >Email</label>
            <input type="email" value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
{/* if error , show the error message */}
        {status.error &&
          <p> Invalid email / password</p>
        }

{/* login button */}
        <button onClick={handleLogin}>Login</button>
        <Link to="/signup" className="btn btn-primary"> Don't have an account yet? Sign Up </Link>

  {/* loading message */}
        {status.loading ? <p> Loading Now </p> : ''}

    </div>
  );
};

export default Login;
