import React from 'react'
import './CollectionCard.css'

const CollectionCard = ({ image, collectionCardHandler }) => {
  return (
    <div className='card-style_collection' onClick={collectionCardHandler}>
      <img src={image} className='image-style_collection' />
    </div>
  )
}

export default CollectionCard
