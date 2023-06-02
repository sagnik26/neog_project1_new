import React from 'react'
import './signup.css'
import { TextField } from '@mui/material'

const Signup = () => {
  return (
    <div className='login-main'>
      <div className='login-container'>
        <div className='center-div-1'><h1 style={{ marginTop: '-1px' }}>Signup</h1></div>
        <div className='center-div-1'>
          <div style={{ width: '90%' }}>
            <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>Email address</span> 
            <TextField
            required
            id="outlined-required"
            defaultValue="Hello World"
            style={{ width: '100%', marginTop: '0.5em' }}
            />
          </div>
        </div>
        <br/>
        <div className='center-div-1'>
          <div style={{ width: '90%' }}>
            <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>Password</span> 
            <TextField
            required
            id="outlined-required"
            defaultValue="Hello World"
            style={{ width: '100%', marginTop: '0.5em' }}
            />
          </div>
        </div>
        <br/>
        <div className='center-div-1'>
          <div className='remember_me'>
            <div className='accept_terms'>
              <input type="checkbox" id="rememeber_me" name="rememeber_me" value="" style={{ marginTop: '-1em', marginLeft: '-1px' }} />
              <p className='remember' style={{ marginTop: '-1px', fontWeight: '500' }}>
                <span>I accept all terms and conditions</span>
              </p>
            </div>
          </div>
        </div>
        <div className='mr-2'></div>
        <div className='center-div-1'>
          <button className='signup-btn'>Signup</button>
        </div>
        <div className='center-div-1'>
          <p style={{ fontWeight: '500' ,cursor: 'pointer' }}>Already have an account →</p>
        </div>
      </div>
    </div>
  )
}

export default Signup

