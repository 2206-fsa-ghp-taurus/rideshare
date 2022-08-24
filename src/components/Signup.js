
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
            totalFootPrint: 0
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
        <div className="ion-padding">
          <div>
            <label >Email</label>
            <input type="email" value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label>Password: 6 digits or longer</label>
            <input type="password" value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
  {/* error message  */}
          {status.error &&
            <p>Registration failed</p>
          }
  {/* handle register */}
          <button onClick={handleSignUp}> Create Account </button>
          <Link to="/login" className="btn btn-primary"> Already have an account? Click to Log In </Link>


    {/* loading message */}
          {status.loading ? <p> Loading Now </p> : ''} 
        </div>
    );
  };
  
  export default Signup;
  