import React, { Component } from 'react'
import './css/signup.css'
export default class signup extends Component {
  render() {
    return (
        <div>
  <input type='text' placeholder='firstname'className='card'/>
  <input type='text'placeholder='lastname'/>
  <input type='text'placeholder='username'/>
  <input type='text'placeholder='password'/>
  <div className='Button'></div>
</div>
     
    )
  }
}