import React, {useState, useContext} from 'react'
import './login.css'
import { TextField } from '@mui/material'
import { loginApi } from '../../apis/authAPI'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

const Login = () => {
  const [pass, setPass] = useState("")
  const [emailAddr, setEmailAddr] = useState("")
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  const loginHandler = () => {    
    if(emailAddr == "" && pass == "") alert("Enter Email Adress & Password")
    else if(emailAddr == "") alert("Enter Email Adress")
    else if(pass == "") alert("Enter Pasword")
    console.log('lllll', location)
    loginApi({email: emailAddr, password: pass}, (val) => {
      if(val) {
        setIsLoggedIn(!isLoggedIn)
        console.log('LLLL', location)
        
        if(location?.state?.from?.pathname)
          navigate(location?.state?.from?.pathname)
        else
          navigate('/')

        if((val == "The email you entered is not Registered. Not Found error" ||
          val == "The credentials you entered are invalid. Unauthorized access error.") 
          && (emailAddr != "" && pass != "")) 
            alert("invalid credentials!!")
      }
    })
  }

  return (
    <div className='login-main'>
      <div className='login-container'>
        <div className='center-div-1'><h1 style={{ marginTop: '-1px' }}>Login</h1></div>
        <div className='center-div-1'>
          <div style={{ width: '90%' }}>
            <span style={{ fontWeight: '700', fontSize: '1.2rem' }}>Email address</span> 
            <TextField
            required
            id="outlined-required"
            value={emailAddr}
            onChange={(e) => setEmailAddr(e.target.value)}
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
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            style={{ width: '100%', marginTop: '0.5em' }}
            />
          </div>
        </div>
        <br/>
        <div className='center-div-1'>
          <div className='remember_me'>
            <div className='remember_me--div'>
              <input type="checkbox" id="rememeber_me" name="rememeber_me" value="" style={{ marginTop: '-1em', marginLeft: '-1px' }} />
              <p className='remember' style={{ marginTop: '-1px', fontWeight: '500' }}>
                Remember
              </p>
            </div>

            <p style={{ fontWeight: '500', marginTop: '-1px', cursor: 'pointer' }}>
              Forgot your password?
            </p>
          </div>
        </div>
        <div className='mr-2'></div>
        <div className='center-div-1'>
          <button className='login-btn' onClick={loginHandler}>Login</button>
        </div>
        <div className='center-div-1'>
          <p style={{ fontWeight: '500', cursor: 'pointer' }}>Create new account →</p>
        </div>
      </div>
    </div>
  )
}

export default Login
