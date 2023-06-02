import React, { useState, useEffect } from 'react'
import './LandingPage.css'
import { getDeviceType } from '../../utils/checkDevice'
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import CollectionCard from '../../components/CollectionCard/CollectionCard';
import { men, women, kid, one, two, three, four, eight, six } from '../../assets/assets'
import { getAllProductsAPI } from '../../apis/productAPI';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LandingPage = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [products, setProducts] = useState([])

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
  
  useEffect(() => {
    getAllProductsAPI(res => {
      console.log('PRODUCTS -> ',res)
      setProducts(res)
    })
  }, [])

  console.log('after', products)

  return (
    <div className='LandingPage_conatainer'>
      <div className="categories-container">
        <div className="categories">
          <h2 style={{ marginTop: '5px' }}>Categories</h2>
          <div className="center-cards">
            <div className="cards">
              <CategoryCard 
                image={men}
                label={"Men's"}
              />
              <CategoryCard 
                image={women}
                label={"Women's"}
              />
              <CategoryCard 
                image={kid}
                label={"Kid's"}
              />
            </div>
          </div>
        </div>
          
        <div className="categories" style={{ marginTop: '1.5em' }}>
          <h2 style={{ marginTop: '5px' }}>Best Collections</h2>
          <div className="center-cards_collection">
          <div className="cards_collection">
              {
                products.length == 0 && (
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box>
                )
              }
              {
                products.splice(0,6).map(val => {
                  return (
                    <CollectionCard 
                      image={val.image}
                    /> 
                )})
              }

          </div>
          </div>
        </div>

        <div className="categories" style={{ marginTop: '1.5em' }}>
          <h2 style={{ marginTop: '5px' }}>Top selling</h2>
          <div className="center-cards_collection">
          <div className="cards_collection">
              {
                products.length == 0 && (
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box>
                )
              }
              {
                products.splice(0,4).map(val => {
                  return (
                    <CollectionCard 
                      image={val.image}
                    /> 
                )})
              }

          </div>
          </div>
        </div>
      </div>
              
      <footer style={{ height: '10vh', backgroundColor: '#2874f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className='footer'>
          <p style={{ color: 'white' }}>@Sagnik.Ghosh</p>
          <div className="icon-holder">
            <div className="icons">
              {isMobile? <LinkedInIcon fontSize='small' style={{ color: 'white' }} />: <LinkedInIcon style={{ color: 'white' }} />}
              {isMobile? <TwitterIcon fontSize='small' style={{ color: 'white' }} />: <TwitterIcon style={{ color: 'white' }} />}
              {isMobile? <GitHubIcon fontSize='small' style={{ color: 'white' }} />: <GitHubIcon style={{ color: 'white' }} />}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
