import React, {useState} from 'react';
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
import UserAccount from './components/UserAccount.js';
import RideRequests from './components/RideRequests';

const App = () => {
  const {loading, authObj} = useAuthInit();
  const [isDriver, setIsDriver] = useState(false)
  console.log('app is rendering with auth:', authObj)
  if (loading) {
    return <p> Loading Now </p>
  }
  return (
    <div>
      <AuthContext.Provider value = {authObj}>
        <Navbar/>
        <Switch>

            <Route exact path = '/login'>
              <Login/>
            </Route>

            <Route exact path = '/selectride'>
            <SelectRide isDriver={isDriver} setIsDriver={setIsDriver} />
            </Route>

            <Route exact path = '/driverlist'>
              <DriverList />
            </Route>

            <Route exact path = '/riderequestlist'>
              <RideRequests />
            </Route>

           <Route exact path = '/signup'>
              <Signup/>
            </Route>

           <Route exact path = '/createProfile'>
              <CreateProfile/>
            </Route>

            <Route exact path='/home'>
              <Home />
            </Route>

            <Route exact path='/'>
              <Redirect to='/home' />
            </Route>

            <Route exact path = '/userMap'>
            <UserMap isDriver={isDriver} />
            </Route>

            <Route exact path='/userAccount'>
              <UserAccount />
            </Route>

        </Switch>
      </AuthContext.Provider>
    </div>
  )
  };
export default App;
