import React, { useEffect, useState } from 'react'
import './Cart.css'
import { getCartDataApi } from '../../apis/cartAPI'
import { useScrollTrigger } from '@mui/material'
import CartItem from '../../components/CartItem/CartItem'

const Cart = () => {
  const [cartData, setCartData] = useState([])

  useEffect((res) => {
    console.log('RES -> ', res)
    setCartData([res, ...cartData])
  })

  console.log('CART_DATA', cartData)
  
  return (
    <div className='cart-main'>
      <h2 style={{ border: '1px solid red' }}>MY CART ()</h2>
      <div className="cart-conatiner">
        <div className="cart_products">
          cart products
        </div>

        <div className="checkout">
          checkout
        </div>
      </div>
    </div>
  )
}

export default Cart
