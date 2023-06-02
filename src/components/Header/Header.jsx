import React from 'react'
import './Header.css'
import { useState, useEffect } from "react";
import { getDeviceType } from '../../utils/checkDevice'
import SideNav from '../SideNav/SideNav';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const device = getDeviceType()
    if(device == "mobile") {
        setIsMobile(true)
    }
    else if(device == "tablet") {
        setIsMobile(true)
    }
    else {
        setIsMobile(false)
    }
    
    window.addEventListener('resize', () => {
        const device = getDeviceType()
        if(device == "mobile") {
            setIsMobile(true)
        }
        else if(device == "tablet") {
            setIsMobile(true)
        }
        else {
            setIsMobile(false)
        }
    })
  }, [])

  return (
    <div className="header">
        <div className="header_main">
          <div className="menu">
            {isMobile && <SideNav fontSize="20px" color="white" />}
            <h2 style={{ color: '#ffffff', fontSize: '1.1rem', marginTop: '2.5px' }}>My <span style={{ color: 'yellow' }}>Bazar</span></h2>
          </div>

          { !isMobile ?  (
            <div className="search_desktop">
                <input type='search' className='searchbox_desktop' placeholder='Search for products'/>
            </div>
          ) : null}
    
          <div className="cart_conatiner">
            <div style={{ color: '#ffffff' }}>
                {isMobile? <ShoppingCartCheckoutIcon fontSize='small' />: <ShoppingCartCheckoutIcon />}
            </div> 
            <div style={{ color: '#ffffff' }}>
                {isMobile? <FavoriteBorderIcon fontSize='small' />: <FavoriteBorderIcon />}
            </div>
            <div>
                <p style={{ color: '#ffffff', marginTop: '-1.2px' }}>Login</p>
            </div> 
          </div>
        </div>
            
        { isMobile ? (
        <div className="search">
            <input type='search' className='searchbox' placeholder='Search for products' />
        </div>
        ) : null }
    </div>
  )
}

export default Header
