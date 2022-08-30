import React, { useState, useEffect } from 'react';
import './App.css';
import UserMap from './components/UserMap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext, useAuthInit } from './auth';
import Login from './components/Login';
import SelectRide from './components/SelectRide';
import DriverList from './components/DriverList';
import Signup from './components/Signup';
import CreateProfile from './components/CreateProfile';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Messaging from './components/Messaging';
import PrivateRoute from './components/PrivateRoute';
import UserAccount from './components/UserAccount.js';
import RideRequests from './components/RideRequests';
import EditProfile from './components/EditProfile';
import CurrentRide from './components/CurrentRide';
import RideComplete from './components/RideComplete';
import RidesHistory from './components/RidesHistory';

const App = () => {
  const { loading, authObj } = useAuthInit();
  const [isDriver, setIsDriver] = useState(false);
  const [userDistance, setUserDistance] = useState(0);
  console.log('app is rendering with auth:', authObj);
  if (loading) {
    return (<div className="flex justify-center items-center">
    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
   </div> )
  }

  return (
    <div>
      <AuthContext.Provider value={authObj}>
        <Navbar />
        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>

          <Route exact path='/selectride'>
            <SelectRide isDriver={isDriver} setIsDriver={setIsDriver} />
          </Route>

          <Route exact path='/driverlist'>
            <DriverList isDriver={isDriver} setIsDriver={setIsDriver}/>
          </Route>

          <Route exact path='/riderequestlist'>

            <RideRequests isDriver={isDriver} setIsDriver={setIsDriver} />

          </Route>

          <Route exact path='/signup'>
            <Signup />
          </Route>

          <Route exact path='/createProfile'>
            <CreateProfile />
          </Route>

          {/* <PrivateRoute exact path='/chat' component={Messaging} /> */}
          <Route exact path='/chat'>
            <Messaging />
          </Route>

          <Route exact path='/home'>
            <Home />
          </Route>

          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>

          <Route exact path='/userMap'>
            <UserMap
              isDriver={isDriver}
              userDistance={userDistance}
              setUserDistance={setUserDistance}
            />
          </Route>

          <Route exact path='/userAccount'>
            <UserAccount isDriver={isDriver} />
          </Route>

          <Route exact path='/editProfile'>
            <EditProfile isDriver={isDriver} />
          </Route>

          <Route exact path='/currentRide'>



            <CurrentRide isDriver={isDriver} />

          </Route>

          <Route exact path='/rideComplete'>
            <RideComplete />
          </Route>

          <Route exact path='/ridesHistory'>
            <RidesHistory />
          </Route>
          

        </Switch>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
