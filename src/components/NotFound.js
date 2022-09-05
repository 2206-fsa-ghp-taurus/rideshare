import React from 'react';

const NotFound = (props) => {
  return (
    <>
      <div>The page at {props.location.pathname} does not exist!</div>
      <p> Please try again!</p>
    </>
  )
}

export default NotFound
