import React, { useEffect, useState } from 'react'
import './Cart.css'
import { getCartDataApi } from '../../apis/cartAPI'
import { useScrollTrigger } from '@mui/material'
import CartItem from '../../components/CartItem/CartItem'

const Cart = () => {
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    getCartDataApi(res => {
      console.log('RES -> ', res)
      setCartData(res)
    })
  },[])

  console.log('CART_DATA', cartData)
  
  return (
    <div className='cart-main'>
      <h2 style={{ border: '1px solid red' }}>MY CART ()</h2>
      <div className="cart-conatiner">
        <div className="cart_products">
          {
            cartData.map(val => {
              return (
                <CartItem 
                  product_name={val.title} 
                  product_price={val.price} 
                />
              )
            })
          }
        </div>

        <div className="checkout">
          checkout
        </div>
      </div>
    </div>
  )
}

export default Cart
