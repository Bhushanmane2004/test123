import React, { useState } from 'react'
import "./Home.css"
import Header from '../../compound/Header/Header.jsx'
import ExploreMenu from '../../compound/ExploreMenu/ExploreMenu.jsx'

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
    </div>
  )
}

export default Home
