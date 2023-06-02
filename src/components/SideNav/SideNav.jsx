import React from 'react'

const SideNav = ({ fontSize, color }) => {
  return (
    <div>
      <span 
        style={{ 
            cursor: 'pointer', 
            fontSize: fontSize, 
            color: color,
        }} 
        onclick="openNav()"
      >
        &#9776;
      </span>
    </div>
  )
}

export default SideNav
