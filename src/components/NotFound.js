import React from 'react';
import {Link} from 'react-router-dom'

const NotFound = (props) => {
  return (
    <div className='text-center pt-5 mx-3'>
      <h3 className='pt-6'>Uh Oh! You seemed to have driven to an unknown location!</h3>
      <Link to='/home'>
        <img className='my-3 mx-auto h-50' src='https://content.mycutegraphics.com/graphics/bunny/bunny-driving-car.png' alt='bunny driving' />
      </Link>
      <div className='text-s space-y-2.5 mt-8'>
      <p className='text-s my-4'>{props.location.pathname} is not a place on our map, and we'd love to help you get back on your original path.</p>
      <Link className='link link-accent link-hover' to='/home'>Click to Return Home</Link>
      </div>
    </div>
  )
}

export default NotFound
