import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar () {
  return (
    <header className="w-full bg-gray-400 h-12 flex flex-row items-center">
      <ul className="flex flex-row items-center px-4">
        <li>
          <NavLink activeClassName="underline" exact to="/" className="text-lg">resto</NavLink>
        </li>
      </ul>
    </header>
  )
}

export default Navbar