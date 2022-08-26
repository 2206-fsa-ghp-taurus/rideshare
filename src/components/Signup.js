
  import React, { useState } from 'react';
  import { Link, Redirect } from 'react-router-dom';
  import { useAuth } from '../auth';
  import { auth, db } from '../firebase';
  import {createUserWithEmailAndPassword} from "firebase/auth"
  import { doc, setDoc} from "firebase/firestore"

  
  const Signup = () => {
    const { loggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState({ loading: false, error: false });
  
    const handleSignUp = async () => {
      try {
        setStatus({ loading: true, error: false });
        const credential = await createUserWithEmailAndPassword(auth, email, password); // create user
        console.log("new user credential", credential);
        // before firebase 9: db.collection().doc().set
        await setDoc(doc(db, 'Users', credential.user.uid),{
            email: credential.user.email,
            totalFootPrint: 0,
            wallet: 100, // virtual wallet, give an initial value of 100 
        })
      } catch (error) {
        setStatus({ loading: false, error: true });
        console.log('error:', error);
      }
    };
  
    if (loggedIn) {
        return <Redirect to ='/createProfile' />
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
                 <span> Password </span>
            </label>
            <input className="input input-bordered input-lg" type="password" value={password} placeholder = '6 digits or longer'
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

  {/* error message  */}
          {status.error &&
            <p>Registration failed</p>
          }
  {/* handle register */}
          <div className="btn-group"> 
            <button onClick={handleSignUp} className="btn btn-active"> Create Account </button>
            <Link to="/login" className="btn"> Already have an account? Click to Log In </Link>
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
  
  export default Signup;
  