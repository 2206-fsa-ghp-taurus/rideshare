import React, { useState } from 'react';
import './App.css';
import UserMap from './components/UserMap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext, useAuthInit } from './auth';
import { DriverContext } from './driverContext';
import Login from './components/Login';
import SelectRide from './components/SelectRide';
import DriverList from './components/DriverList';
import Signup from './components/Signup';
import CreateProfile from './components/CreateProfile';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Messaging from './components/Messaging';
import UserAccount from './components/UserAccount.js';
import RideRequests from './components/RideRequests';
import EditProfile from './components/EditProfile';
import CurrentRide from './components/CurrentRide';
import RideComplete from './components/RideComplete';
import RidesHistory from './components/RidesHistory';
import NotFound from './components/NotFound';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const App = () => {
  const { loading, authObj } = useAuthInit();
  const [isDriver, setIsDriver] = useState(null);
  const [currentRide, setCurrentRide] = useState(null);
  const [selectedDrive, setSelectToDrive] = useState(false);
  const [isShow, setIsShow] = useState(false);

  console.log('app is rendering with auth:', authObj);
  if (loading) {
    return (
      <div className='flex justify-center items-center'>
        <div
          className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'
          role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  const getUser = async () => {
    const user = await authObj.userId;
    const docSnap = await getDoc(doc(db, 'Users', `${user}`));
    const userName = docSnap.data();
    if (userName && userName.driverStatus) {
      setIsDriver(true);
    } else if (userName) {
      setIsDriver(null);
    }
  };

  if (authObj.loggedIn) {
    getUser();
  }

  return (
    <>
      <AuthContext.Provider value={authObj}>
        <DriverContext.Provider
          value={{ isDriver, setIsDriver, currentRide, setCurrentRide }}>
          <Navbar />
          <Switch>
            <Route exact path='/login'>
              <Login />
            </Route>

            <Route exact path='/selectride'>
              <SelectRide
                selectedDrive={selectedDrive}
                setSelectToDrive={setSelectToDrive}
              />
            </Route>

            <Route exact path='/driverlist'>
              <DriverList />
            </Route>

            <Route exact path='/riderequestlist'>
              <RideRequests />
            </Route>

            <Route exact path='/signup'>
              <Signup />
            </Route>

            <Route exact path='/createProfile'>
              <CreateProfile />
            </Route>

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
                selectedDrive={selectedDrive}
              />
            </Route>

            <Route exact path='/userAccount'>
              <UserAccount />
            </Route>

            <Route exact path='/editProfile'>
              <EditProfile />
            </Route>

            <Route exact path='/currentRide'>
              <CurrentRide
                selectedDrive={selectedDrive}
                setSelectToDrive={setSelectToDrive}
              />
            </Route>

            <Route exact path='/rideComplete'>
              <RideComplete />
            </Route>

            <Route exact path='/ridesHistory'>
              <RidesHistory />
            </Route>

            <Route component={NotFound} />
          </Switch>
        </DriverContext.Provider>
      </AuthContext.Provider>
    </>
  );
};

export default App;
