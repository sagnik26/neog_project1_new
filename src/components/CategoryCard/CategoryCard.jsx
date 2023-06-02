import React from 'react'
import './CategoryCard.css'

const CategoryCard = ({ image, label }) => {
  return (
    <div className='card-style'>
      <img src={image} className='image-style' />
      <p style={{ marginTop: '-4px', textAlign: 'center' }}>{label}</p>
    </div>
  )
}

export default CategoryCard
