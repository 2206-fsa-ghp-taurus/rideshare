
import React, { useContext, useEffect, useState } from 'react';
import { auth } from './firebase';

//////////////////////////////// useAuth hook
// custom hook, so other components do not to use useContext
// return an objet with loggedin property
export const AuthContext = React.createContext({ loggedIn: false });
export function useAuth() {
  return useContext(AuthContext);
}

/////////////////////////////// useAuthInithook
// initialize the authentication sate
// returns loading flag + auth object (loggedin + userId)
export function useAuthInit() {
  const [authInit, setAuthInit] = useState({ loading: true });
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      const authObj = user ?
        { loggedIn: true, userId: user.uid } :
        { loggedIn: false };
      setAuthInit({ loading: false, authObj });
    });
  }, []);
  return authInit;
}
