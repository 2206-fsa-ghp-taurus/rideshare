import React from 'react';
import './App.css';
import UserMap from './components/UserMap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext, useAuthInit } from './auth';
import Login from './components/Login';
import Messaging from './components/Messaging';

const App = () => {
  const { loading, authObj } = useAuthInit();
  console.log('app is rendering with auth:', authObj);
  if (loading) {
    return <p> Loading Now </p>;
  }
  return (
    <div>
      <AuthContext.Provider value={authObj}>
        <Switch>
          {/* login route */}
          <Route exact path='/login'>
            <Login />
          </Route>

          {/* home route, now rendering UserMap component */}
          <Route exact path='/home'>
            <UserMap />
          </Route>
          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>
          <Route path='/chat'></Route>
        </Switch>
      </AuthContext.Provider>
    </div>
  );
};
export default App;
