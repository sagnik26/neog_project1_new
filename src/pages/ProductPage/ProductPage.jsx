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
  const [productsTwo, setProductsTwo] = useState([])
  const [productsThree, setProductsThree] = useState([])
  const [productsFour, setProductsFour] = useState([])
  const [productArrLength, setProductArrLength] = useState(0)
  const {isLoggedIn, isWish, setIsWish} = useContext(AuthContext)
  const navigate = useNavigate()

  const [priceVal, setPriceVal] = useState(500)
  const [checkOne, setCheckOne] = useState(false)
  const [checkTwo, setCheckTwo] = useState(false)
  const [checkRadio, setCheckRadio] = useState("")


  useEffect(() => {
    getAllProductsAPI((res) => {
        console.log('Products', res)
        setProducts(res)
        setProductsTwo(res)
        setProductsThree(res)
        setProductsFour(res)
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
    if(e.target.value == 'all') {
      setProducts(productsFour)
    }
    if(e.target.value == 'four') {
      setProducts(productsFour.filter(val => Number(val.stars) >= 4))
    }
    if(e.target.value == 'three') {
      setProducts(productsFour.filter(val => Number(val.stars) >= 3))
    }
    if(e.target.value == 'two') {
      setProducts(productsFour.filter(val => Number(val.stars) >= 2))
    }
    if(e.target.value == 'one') {
      setProducts(productsFour.filter(val => Number(val.stars) >= 1))
    }
    if(e.target.value == 'lowToHigh') {
      products.sort((a,b) => {
        return Number(a.price) - Number(b.price)
      })
    }
    if(e.target.value == 'highToLow') {
      products.sort((a,b) => {
        return Number(b.price) - Number(a.price)
      })
    }
  }

  const handleCheckOne = () => {
    setCheckOne(!checkOne)
    if(!checkTwo) {
      if(!checkOne) {
        // getAllProductsAPI((res) => setProducts(res.filter(val => val.category == "men" )))
        setProducts(productsThree.filter(val => val.category == "men" ))
        setProductsFour(productsThree.filter(val => val.category == "men" ))
        setProductsTwo(productsThree)
      }
      else {
        setProducts(productsTwo)
        setProductsFour(productsTwo)
      }
    }
    else {
      if(!checkOne) {
        setProducts(productsThree)
        setProductsFour(productsThree)
      }
      else {
        setProducts(productsThree.filter(val => val.category == "women" ))
        setProductsFour(productsThree.filter(val => val.category == "women" ))
      }
    }
  }

  const handleCheckTwo = () => {
    setCheckTwo(!checkTwo)
    if(!checkOne) {
      if(!checkTwo) {
        // getAllProductsAPI((res) => setProducts(res.filter(val => val.category == "women" )))
        setProducts(productsThree.filter(val => val.category == "women" ))
        setProductsFour(productsThree.filter(val => val.category == "women" ))
        setProductsTwo(productsThree)
      }
      else
        setProducts(productsTwo)
        setProductsFour(productsTwo)
    }
    else {
      if(!checkTwo) {
        setProducts(productsThree)
        setProductsFour(productsThree)
      }
      else {
        setProducts(productsThree.filter(val => val.category == "men" ))
        setProductsFour(productsThree.filter(val => val.category == "men" ))
      }
    }
  }

  const refreshFunc = () => {
    setPriceVal(500)
    setCheckOne(false)
    document.getElementById('checkOne').checked = false
    setCheckTwo(false)
    document.getElementById('checkTwo').checked = false
    setCheckRadio("")
    getAllProductsAPI(res => setProducts(res))
  }
  
  return (
    <>
        <div className='products-main not-mobile'>
          <div className="filters">
            <div className="filter_header">
              <div style={{ fontWeight: 'bold' }}>Filters</div>
              <div style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={refreshFunc}><u>Clear</u></div>
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
                  // getAllProductsAPI((res) => setProducts(res.filter(val => val.price <= e.target.value )))
                  setProducts(productsTwo.filter(val => val.price <= e.target.value ))
                  setProductsThree(productsTwo.filter(val => val.price <= e.target.value ))
                  setProductsFour(productsTwo.filter(val => val.price <= e.target.value ))
                }}
                style={{ width: '100%', cursor: 'pointer' }}
              />
            </div>

            <div className="category" style={{ marginBottom: '2em' }}>
              <p style={{ textAlign: 'left', fontWeight: '700', marginBottom: '1.1em' }}>Category</p>

              <label>
                <input type="checkbox" value={checkOne} id='checkOne' onChange={handleCheckOne} style={{ marginLeft: '-4.2em'  }} />
                Men's clothing
              </label>
              <br />
              <label>
                <input type="checkbox" value={checkTwo} id='checkTwo' onChange={handleCheckTwo} style={{ marginLeft: '-2.5em'  }} />
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
            <h2 style={{ marginTop: '-0.5em', fontSize: '1.5em' }}>All Products <span style={{ fontWeight: '500', fontSize: '1.3rem' }}>({products.length})</span></h2>
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
