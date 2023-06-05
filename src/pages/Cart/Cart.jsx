import React, { useEffect, useState } from 'react'
import './Cart.css'
import { getCartDataApi } from '../../apis/cartAPI'
import { useScrollTrigger } from '@mui/material'
import CartItem from '../../components/CartItem/CartItem'

const Cart = () => {
  const [cartData, setCartData] = useState([])
  let [totalPrice, setTotalPrice] = useState(0)
  let discount = totalPrice > 1500 ? 1000 : 0
  let delivery_charge = totalPrice > 1000 ? 300 : 0

  useEffect(() => {
    getCartDataApi(res => {
      console.log('RES -> ', res)
      setCartData(res)
    })
  },[])

  useEffect(() => {
    setTotalPrice(cartData.reduce((total, curr) => total + Number(curr.price), 0)) 
  }, [cartData])

  console.log('CART_DATA', cartData)

  console.log('PRICE', totalPrice)
  
  return (
    <div className='cart-main'>
      <h2 style={{ marginTop: '0.3em' }}>MY CART</h2>
      <div className="cart-conatiner">
        <div className="cart_products">
          {
            cartData.map(val => {
              return (
                <CartItem 
                  product_name={val.title} 
                  product_price={val.price} 
                  image={val.image}
                />
              )
            })
          }
        </div>

        <div className="checkout">
          <div className="checkout_container">
            <div style={{ fontWeight: 800, marginBottom: '1em', textAlign: 'left' }}>PRICE DETAILS</div>
            <div className="check">
             <div className="price">Price</div>
              <div className="amount">{totalPrice} INR</div>
            </div>
            <div className="check">
             <div className="price">Discount</div>
              <div className="amount">{discount} INR</div>
            </div>
            <div className="check">
             <div className="price">Delivery charges</div>
              <div className="amount">{delivery_charge} INR</div>
            </div>

            <div className="check">
             <div className="total_price">TOTAL AMOUNT</div>
              <div className="total_amount">{totalPrice - discount - delivery_charge} INR</div>
            </div>

            <p style={{ textAlign: 'left', fontSize: '1.1rem' }}>
              {discount == 1000 ? '* you will save 1000 INR under this order': '* Add items of total 1500 INR to get an offer upto 1000 INR'}
            </p>
            <button className='order_btn'>Place Order</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
