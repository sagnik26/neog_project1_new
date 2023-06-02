import React from 'react'
import './ProductCard.css'
import one from '../../assets/one.jpg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductCard = ({ image, name, price }) => {
  return (
    <div className='product-main'>
      <img className='product-image' src={image} alt='no image found' />
      <div className="details">
        <div style={{ margin: '0.3em 0' }}>{name}</div>
        <div style={{ margin: '0.3em 0', fontWeight: 'bold' }}>Rs: {price}</div>
        <div className='addToCart'>Add to cart</div>
      </div>
      <span className='wishlistBtn'>
        <FavoriteBorderIcon fontSize='small' />
      </span>
    </div>
  )
}

export default ProductCard
