import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='ExploreMenu' id='ExploreMenu'>
      <h1>Explore Our Menu</h1>
      <p className='ExploreMenu-text'>Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className='ExploreMenu-List'>
        {menu_list.map((item) => (
          <div
            key={item.menu_name}
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            className='ExploreMenu-list-item'
          >
            <img className={category===item.menu_name?'active':''} src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
