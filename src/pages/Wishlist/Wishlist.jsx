import React, {useState, useEffect, useContext} from 'react'
import './Wishlist.css'
import { getWishListApi } from '../../apis/wishListApi'
import ProductCard from '../../components/ProductCard/ProductCard'
import { addToCartApi } from '../../apis/cartAPI'
import { AuthContext } from '../../contexts/AuthContext'

const Wishlist = () => {
  const [wishlist, setWishList] = useState([])
  const { isWish, setIsWish } = useContext(AuthContext)

  useEffect(() => {
    getWishListApi((res) => {
        setWishList(res)
    })
  }, [])

  console.log('Wishlist', wishlist)

  const addToCartHandler = (_id, title, author, price, categoryName, stars, offer, image) => {
      addToCartApi({ _id: _id, title: title, author: author, price: price, categoryName: categoryName, stars: stars, offer: offer, image: image }, (res) => {
        console.log('cart res', res)
      })
  }

  return (
    <div>
        <div className="wish-main-container">
            <div className='wish-main'>
                <h2 style={{ marginTop: '0.3em' }}>My Wishlist ()</h2>
                <div className="wish">
                    {
                        wishlist.map(val => {
                            return (
                                <ProductCard
                                    name={val.title}
                                    price={val.price}
                                    image={val.image}
                                    addToCart={() => addToCartHandler(val._id, val.title, localStorage.getItem('name'), val.price, val.categoryName, val.stars, val.offer, val.image)}
                                    isWish={isWish}
                                />
                            )
                        })
                    }
                </div>
            </div>   
        </div>
    </div>
  )
}

export default Wishlist
