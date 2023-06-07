import React from 'react'
import './Header.css'
import { useState, useEffect, useContext } from "react";
import { getDeviceType } from '../../utils/checkDevice'
import SideNav from '../SideNav/SideNav';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { getAllCategoriesAPI } from '../../apis/categoryAPI';
import { getAllProductsAPI } from '../../apis/productAPI';
import { faL } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [category, setCategory] = useState([])
  const navigate = useNavigate()
  const location  = useLocation()
  console.log('loccc', location)
  const { isLoggedIn, setIsLoggedIn, inputVal, setInputVal, setProducts } = useContext(AuthContext)

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

  const goToLogin = () => {
    if(!isLoggedIn) {
      navigate('/login')
    }
    else {
      if(window.confirm("Do you want to logout?")) {
        localStorage.removeItem('encodedToken');
        localStorage.removeItem('name');
        setIsLoggedIn(false)
        navigate('/')
      }
    }
  }

  useEffect(() => {
    getAllCategoriesAPI(res => setCategory(res))
    if(category.some((val => val.categoryName === inputVal))) {
      setIsTyping(true)
    }
    else setIsTyping(false)
  }, [inputVal])

  console.log('CAT', category)

  return (
    <div className="header">
        <div className="header_main">
          <div className="menu">
            {isMobile && <SideNav fontSize="20px" color="white" />}
            <h2 style={{ color: '#ffffff', fontSize: '1.1rem', marginTop: '2.5px', cursor: 'pointer' }} onClick={() => navigate('/')}>My <span style={{ color: 'yellow' }}>Bazar</span></h2>
          </div>

          { !isMobile ?  (
            <div className="search_desktop">
                <input type='search' className='searchbox_desktop' value={inputVal} onChange={(e) => setInputVal(e.target.value)}  placeholder='Search for products' />
                <SearchIcon style={{ position: 'absolute', marginLeft: '0.3em' }} />
            </div>
          ) : null}

        {
          isTyping ? 
            <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              position: 'absolute',
              top: '2.7em',
              left: '27.8%',
              '& > :not(style)': {
                m: 1,
                width: 130,
                height: 30,
                border: '1px solid black',
              },
            }}
            >
            <Paper elevation={0} style={{ textAlign: 'left', padding: '0.3em' }}>
              {
                category.filter(val => val.categoryName == inputVal)
                .map(x => <div key={x._id} 
                style={{ marginBottom: '0.3em', cursor: 'pointer' }}
                onClick={() => {
                  setIsTyping(false)
                  setInputVal("")
                  if(location.pathname == '/products') {
                    if(inputVal.length > 2)
                      getAllProductsAPI(res => setProducts(res.filter(val => val.category == x.categoryName)))
                  }
                  else{
                    navigate('/products')
                  }
                }}
                >
                {x.categoryName}
                </div>)
              }
            </Paper>
            </Box> : null
        }

    
          <div className="cart_conatiner">
            <div style={{ color: '#ffffff' }}>
                {isMobile? <ShoppingCartCheckoutIcon fontSize='small' onClick={() => navigate('/cart')} />: <ShoppingCartCheckoutIcon onClick={() => navigate('/cart')} />}
            </div> 
            <div style={{ color: '#ffffff' }}>
                {isMobile? <FavoriteBorderIcon fontSize='small' onClick={() => navigate('/wishlist')} />: <FavoriteBorderIcon onClick={() => navigate('/wishlist')} />}
            </div>
            <div>
                <p style={{ color: '#ffffff', marginTop: '-1.2px', cursor: 'pointer' }} onClick={goToLogin}>
                  {isLoggedIn ? 'Logout': 'Login'}
                </p>
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
