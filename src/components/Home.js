import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { useAuth } from '../auth';

const Home = () => {
    const { loggedIn } = useAuth();
    if (loggedIn){
        return <Redirect to ='/selectRide' />
    }
    return (
        <div>
            <h1> Welcome! </h1>
            <img src = 'https://www.netsolutions.com/insights/wp-content/uploads/2020/12/the-10-best-rideshare-apps.webp'></img>
            <Link to="/login" className = 'btn btn-primary'>Login</Link>
            <Link to="/signup" className="btn btn-primary">SignUp</Link>  
        </div>
    )
}

export default Home;