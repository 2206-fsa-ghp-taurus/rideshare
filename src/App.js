import React from 'react';
import './App.css';
import UserMap from './components/UserMap';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext, useAuthInit } from './auth';
import Login from './components/Login';
import SelectRide from './components/SelectRide';
import RiderDetails from './components/RiderDetails';
import Signup from './components/Signup';
import CreateProfile from './components/CreateProfile';
import Navbar from './components/Navbar';
import Home from './components/Home';
const App = () => {
  const {loading, authObj} = useAuthInit();
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
              <SelectRide />
            </Route>

            <Route exact path = '/riderdetails'>
              <RiderDetails/>
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
              <UserMap/>
            </Route>

        </Switch>
      </AuthContext.Provider>
    </div>
  )
  };
export default App;
