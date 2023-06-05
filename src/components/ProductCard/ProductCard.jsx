import React from 'react'
import './ProductCard.css'
import one from '../../assets/one.jpg'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { deleteWishlistItem } from '../../apis/wishListApi';

const ProductCard = ({image, id, name, price, addToCart, addToWishlist, isWish}) => {
  return (
    <div className='product-main'>
      <img className='product-image' src={image} alt='no image found' />
      <div className="details">
        <div style={{ margin: '0.3em 0' }}>{name}</div>
        <div style={{ margin: '0.3em 0', fontWeight: 'bold' }}>Rs: {price}</div>
        <div className='addToCart' onClick={addToCart}>Add to cart</div>
      </div>
      <div className='wishlistBtn' onClick={addToWishlist}>
        {
          isWish ? 
          <FavoriteBorderIcon fontSize='small' style={{ fill: 'red' }}  /> : 
          <FavoriteBorderIcon fontSize='small' style={{ fill: 'black' }} />
        }
      </div>
    </div>
  )
}

export default ProductCard
