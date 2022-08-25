import React from 'react';
import './App.css';
import UserMap from './components/UserMap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext, useAuthInit } from './auth';
import Login from './components/Login';
import Messaging from './components/Messaging';
import SelectRide from './components/SelectRide';
import RiderDetails from './components/RiderDetails';
import Signup from './components/Signup';
import CreateProfile from './components/CreateProfile';
import Navbar from './components/Navbar';

const App = () => {
  const { loading, authObj } = useAuthInit();
  console.log('app is rendering with auth:', authObj);
  if (loading) {
    return <p> Loading Now </p>;
  }
  return (
    <div>
      <AuthContext.Provider value={authObj}>
        <Navbar />
        <Switch>
          {/* login route */}
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/selectride'>
            <SelectRide />
          </Route>
          <Route exact path='/riderdetails'>
            <RiderDetails />
          </Route>
          {/* signup route */}
          <Route exact path='/signup'>
            <Signup />
          </Route>

          {/* signup route */}
          <Route exact path='/signup'>
            <Signup />
          </Route>

          {/* createProfile route */}
          <Route exact path='/createProfile'>
            <CreateProfile />
          </Route>

          {/* home route, now rendering UserMap component */}
          <Route exact path='/home'>
            <UserMap />
          </Route>
          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>
          <Route path='/chat'>
            <Messaging />
          </Route>
        </Switch>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
