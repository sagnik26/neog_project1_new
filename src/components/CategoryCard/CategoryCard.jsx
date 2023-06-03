import React from 'react'
import './CategoryCard.css'

const CategoryCard = ({ image, label, categoryHandler }) => {
  return (
    <div className='card-style' onClick={categoryHandler}>
      <img src={image} className='image-style' />
      <p style={{ marginTop: '-4px', textAlign: 'center' }}>{label}</p>
    </div>
  )
}

export default CategoryCard
