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
            {/* login route */}
            <Route exact path = '/login'>
              <Login/>
            </Route>
            <Route exact path = '/selectride'>
              <SelectRide />
            </Route>
            <Route exact path = '/riderdetails'>
              <RiderDetails/>
</Route>
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
