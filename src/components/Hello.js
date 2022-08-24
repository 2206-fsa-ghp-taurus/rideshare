// this is a placeholder component after use has created their profile 

import React, { Component } from 'react'
import { auth } from '../firebase';
export default class Hello extends Component {
  render() {
    return (
        <div> 
            <p> Success - Placeholder Message</p>
            <button onClick = {()=> auth.signOut()}> Logout</button>
        </div>
    )
  }
}
