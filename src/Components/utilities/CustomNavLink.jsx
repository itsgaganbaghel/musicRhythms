import React from 'react'
import { NavLink } from 'react-router-dom'

const CustomNavLink = ({ to, text, handleClick }) => {
    return (
        <NavLink
            to={to}
            className='w-full text-start  hover:text-center py-2 px-4 rounded-lg hover:bg-light hover:text-primary transition-all duration-300'
            onClick={handleClick && handleClick}
        >
            {text}
        </NavLink>
    )
}

export default CustomNavLink