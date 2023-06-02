import React from 'react'
import './CollectionCard.css'

const CollectionCard = ({ image, label }) => {
  return (
    <div className='card-style_collection'>
      <img src={image} className='image-style_collection' />
    </div>
  )
}

export default CollectionCard
