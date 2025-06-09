import React from 'react'

import logo from "../../assets/logo.png"
import { NavLink } from 'react-router-dom'

const Logo = () => {
  return (
    <NavLink to={'/'}>
      <img src={logo} className=' w-[90%] ' />
    </NavLink>
  )
}
export default Logo