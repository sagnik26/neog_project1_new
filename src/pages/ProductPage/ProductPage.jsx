import React, {useState, useEffect} from 'react'
import './ProductPage.css'
import { getAllProductsAPI } from '../../apis/productAPI'
import ProductCard from '../../components/ProductCard/ProductCard'

const ProductPage = () => {
  const [products, setProducts] = useState([])
  const [productArrLength, setProductArrLength] = useState(0)

  useEffect(() => {
    getAllProductsAPI((res) => {
        console.log('Products', res)
        setProducts(res)
        setProductArrLength(res.length)
    })
  }, [])

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
