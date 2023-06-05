import React, {useState, useEffect,useContext} from 'react'
import './ProductPage.css'
import { getAllProductsAPI } from '../../apis/productAPI'
import { addToCartApi } from '../../apis/cartAPI'
import { addToWishListApi } from '../../apis/wishListApi'
import ProductCard from '../../components/ProductCard/ProductCard'
import {AuthContext} from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { deleteWishlistItem } from '../../apis/wishListApi'

const ProductPage = () => {
  const [products, setProducts] = useState([])
  const [productArrLength, setProductArrLength] = useState(0)
  const {isLoggedIn, isWish, setIsWish} = useContext(AuthContext)
  const navigate = useNavigate()

  const [priceVal, setPriceVal] = useState(500)
  const [checkOne, setCheckOne] = useState(false)
  const [checkTwo, setCheckTwo] = useState(false)
  const [checkRadio, setCheckRadio] = useState("four")


  useEffect(() => {
    getAllProductsAPI((res) => {
        console.log('Products', res)
        setProducts(res)
        setProductArrLength(res.length)
    })
  }, [])

  const addToCartHandler = (_id, title, author, price, categoryName, stars, offer, image) => {

    if(!isLoggedIn) 
      navigate('/login')
    else
      addToCartApi({ _id: _id, title: title, author: author, price: price, categoryName: categoryName, stars: stars, offer: offer, image: image }, (res) => {
        console.log('cart res', res)
      })
  }

  const addToWishlistHandler = (_id, title, author, price, categoryName, stars, offer, image) => {
    if(!isLoggedIn) 
      navigate('/login')
    else
      addToWishListApi({ _id: _id, title: title, author: author, price: price, categoryName: categoryName, stars: stars, offer: offer, image: image }, (res) => {
        console.log('wishlist add', res)
        if(res)
          setIsWish(isWish => ({
            ...isWish,
            [_id]: !isWish[_id]
          }))
      })
  }

  const onOptionChange = (e) => {
    setCheckRadio(e.target.value)
  }

  const handleCheckOne = () => {
    setCheckOne(!checkOne)
    if(!checkOne) 
      // getAllProductsAPI((res) => setProducts(res.filter(val => val.category == "men" )))
      setProducts(products.filter(val => val.category == "men" ))
    else
      setProducts(products)
  }

  const handleCheckTwo = () => {
    setCheckTwo(!checkTwo)
    if(!checkTwo) 
      getAllProductsAPI((res) => setProducts(res.filter(val => val.category == "women" )))
    else
      getAllProductsAPI((res) => setProducts(res))
  }

  return (
    <>
        <div className='products-main not-mobile'>
          <div className="filters">
            <div className="filter_header">
              <div style={{ fontWeight: 'bold' }}>Filters</div>
              <div style={{ fontWeight: 'bold', cursor: 'pointer' }}><u>Clear</u></div>
            </div>
            <div className="price" style={{ marginBottom: '2em' }}>
              <p style={{ textAlign: 'left', fontWeight: '700', marginBottom: '1.1em' }}>Price (1000 - 4000)</p>
              <input
                type="range"
                min="500"
                max="4000"
                step="500"
                value={priceVal}
                className="slider"
                id="slide"
                onChange={(e) => {
                  if(e.target.value == 500) getAllProductsAPI((res) => setProducts(res))
                  setPriceVal(e.target.value)
                  console.log(e.target.value)
                  getAllProductsAPI((res) => setProducts(res.filter(val => val.price <= e.target.value )))
                }}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

            <div className="category" style={{ marginBottom: '2em' }}>
              <p style={{ textAlign: 'left', fontWeight: '700', marginBottom: '1.1em' }}>Category</p>

              <label>
                <input type="checkbox" value={checkOne} onChange={handleCheckOne} style={{ marginLeft: '-4.2em'  }} />
                Men's clothing
              </label>
              <br />
              <label>
                <input type="checkbox" value={checkTwo} onChange={handleCheckTwo} style={{ marginLeft: '-2.5em'  }} />
                Women's clothing
              </label>
            </div>

            <div className="category" style={{ marginBottom: '2em' }}>
              <p style={{ textAlign: 'left', fontWeight: '700', marginBottom: '1.1em' }}>Rating</p>

              <form>
                <input type="radio" id='four' value='four' checked={checkRadio === 'four'} onChange={onOptionChange} style={{ marginLeft: '-2.8em' }} />
                <label for='four'>4 stars and above</label>
                <br/>
                <input type="radio" id='three' value='three' checked={checkRadio === 'three'} onChange={onOptionChange} style={{ marginLeft: '-2.8em' }} />
                <label for='three'>3 stars and above</label>
                <br/>
                <input type="radio" id='two' value='two' checked={checkRadio === 'two'} onChange={onOptionChange} style={{ marginLeft: '-2.8em' }} />
                <label for='two'>2 stars and above</label>
                <br/>
                <input type="radio" id='one' value='one' checked={checkRadio === 'one'} onChange={onOptionChange} style={{ marginLeft: '-2.8em' }} />
                <label for='one'>1 stars and above</label>
              </form>
            </div>

            <div className="category" style={{ marginBottom: '2em' }}>
              <p style={{ textAlign: 'left', fontWeight: '700', marginBottom: '1.1em' }}>SortBy</p>

              <form>
                <input type="radio" id='four' value='lowToHigh' checked={checkRadio === 'lowToHigh'} onChange={onOptionChange} style={{ marginLeft: '-2.2em' }} />
                <label for='four'>Price - Low to High</label>
                <br/>
                <input type="radio" id='three' value='highToLow' checked={checkRadio === 'highToLow'} onChange={onOptionChange} style={{ marginLeft: '-2.2em' }} />
                <label for='three'>Price - High to Low</label>
              </form>
            </div>
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
                                addToCart={() => addToCartHandler(val._id, val.title, localStorage.getItem('name'), val.price, val.category, val.stars, val.offer, val.image)}
                                addToWishlist={() => addToWishlistHandler(val._id, val.title, localStorage.getItem('name'), val.price, val.category, val.stars, val.offer, val.image)}
                                isWish={isWish[val._id]}
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
                            addToCart={() => addToCartHandler(val._id, val.title, localStorage.getItem('name'), val.price, val.category, val.stars, val.offer, val.image)}
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
