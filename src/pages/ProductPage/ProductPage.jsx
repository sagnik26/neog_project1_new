import React, {useState, useEffect,useContext} from 'react'
import './ProductPage.css'
import { getAllProductsAPI } from '../../apis/productAPI'
import { addToCartApi } from '../../apis/cartAPI'
import ProductCard from '../../components/ProductCard/ProductCard'
import {AuthContext} from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const ProductPage = () => {
  const [products, setProducts] = useState([])
  const [productArrLength, setProductArrLength] = useState(0)
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    getAllProductsAPI((res) => {
        console.log('Products', res)
        setProducts(res)
        setProductArrLength(res.length)
    })
  }, [])

  const addToCartHandler = (_id, title, author, price, categoryName) => {
    if(!isLoggedIn) 
      navigate('/login')
    else
      addToCartApi({ _id: _id, title: title, author: author, price: price, categoryName: categoryName }, (res) => {
        console.log('cart res', res)
      })
  }

  return (
    <>
        <div className='products-main not-mobile'>
          <div className="filters">
            filters
          </div>
          <div className="products-conatainer">
            <h2 style={{ marginTop: '-0.5em', fontSize: '1.5em' }}>All Products <span style={{ fontWeight: '500', fontSize: '1.3rem' }}>({productArrLength})</span></h2>
            <div className="products">
                {
                    products.map(val => {
                        return (
                            <ProductCard
                                image={val.image}
                                name={val.title}
                                price={val.price}
                                addToCart={() => addToCartHandler(val._id, val.title, localStorage.getItem('name'), val.price, val.category)}
                            />
                        )
                    })
                }
            </div>
          </div>
        </div>   
        
        <div className="products-main-mobile only-mobile">
            <h2 style={{ marginTop: '-0.5em' }}>All Products <span style={{ fontWeight: '500' }}>({productArrLength})</span></h2>
            <div className="products-mobile">
              {
                products.map(val => {
                    return (
                        <ProductCard
                            image={val.image}
                            name={val.title}
                            price={val.price}
                            addToCart={() => addToCartHandler(val._id, val.title, localStorage.getItem('name'), val.price, val.category)}
                        />
                    )
                })
              }
            </div>
        </div>
    </>
    )
}

export default ProductPage
