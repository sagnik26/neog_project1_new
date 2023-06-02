import React from 'react'
import './CartItem.css'
import {one} from '../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'

const CartItem = ({ image, product_name, product_price, product_offer }) => {
  return (
    <div className='cartItem-card'>
      <div className="cart_image">
        <img className='cart_image--style' src={image} alt="No image found" />
      </div>

      <div className="cart_details">
        <div className="cart_details--conatiner">
            <div className='cart-marginBottom cart-name'>{product_name}</div>
            <div className='cart-marginBottom cart-price'>{product_price}</div>
            <div className='cart-offer' style={{ marginBottom: '0.1em' }}>{product_offer}</div>
            <div className='cart-marginBottom cart-quantity'>
              <div className='quantity'>Quantity : </div>
              <div className='quantity_input'>
                <div className='cartQuantBtn'>
                  <AiOutlinePlusCircle />
                </div>
                <input className='cartInput' type="text" />
                <div className='cartQuantBtn'>
                  <AiOutlineMinusCircle />
                </div>
              </div>
            </div>
            <div className='cart-buttons'>
                <button className='cart-btn btn-remove'>Remove from cart</button>
                <button className='cart-btn btn-move'>Move to wishlist</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
