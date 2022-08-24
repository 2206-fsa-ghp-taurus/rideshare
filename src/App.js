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
import Hello from './components/Hello';

const App = () => {
  const {loading, authObj} = useAuthInit();
  console.log('app is rendering with auth:', authObj)
  if (loading) {
    return <p> Loading Now </p>
  }
  return (
    <div>
      <AuthContext.Provider value = {authObj}>
        <Switch>
          {/* Hello route; placeholder; for user signing up and create a new profile*/}
          <Route exact path = '/hello'>
              <Hello/>
          </Route>

            {/* login route */}
            <Route exact path = '/login'>
              <Login/>
            </Route>
            <Route exact path = '/selectride'>
              <SelectRide />
            </Route>
            <Route exact path = '/riderdetails'>
              <RiderDetails/>

           {/* signup rote */}
           <Route exact path = '/signup'>
              <Signup/>
            </Route>

            {/* createProfile rote */}
           <Route exact path = '/createProfile'>
              <CreateProfile/>
            </Route>

           {/* home route, now rendering UerMap component */}
            <Route exact path='/home'>
              <UserMap />
            </Route>
            <Route exact path='/'>
              <Redirect to='/home' />
            </Route>

        </Switch>
      </AuthContext.Provider>
    </div>
  )
  };
export default App;
