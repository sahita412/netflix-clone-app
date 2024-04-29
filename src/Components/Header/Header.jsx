import React from 'react'
import logo from "../../logo.png"
import { Link } from 'react-router-dom'
import { ImSearch } from 'react-icons/im'

const Header = () => {
  return (
    <nav className='Header'>
        <img src={logo} alt="" />
        <div>
            <Link to="/tvshows">TV shows</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/recent">Recently Added</Link>
            <Link to="/mylist">My List</Link>
        </div>
        <ImSearch/>
    </nav>
  )
}

export default Header