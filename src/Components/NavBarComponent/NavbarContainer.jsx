import React, { useContext, useState } from 'react'
import Menu from './Menu'
import AlbumSideBar from '../Pages/AlbumPages/AlbumSideBar'
import { RxCross1 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from './Logo';
import { AuthUserContext } from '../Context/AuthContext';
const NavbarContainer = () => {

    let { isMenuVisible, setIsMenuVisible } = useContext(AuthUserContext)

    return (
        <div className='h-[10vh]  w-full flex lg:flex-row  justify-between  lg:px-10  items-center bg-primary text-white relative'>
            <section className='md:hidden flex gap-4 items-center'>
                <p className='pl-5 text-2xl cursor-pointer ' onClick={() => setIsMenuVisible(!isMenuVisible)} >
                    {
                        isMenuVisible ?
                            <RxCross1 />
                            :
                            <GiHamburgerMenu />
                    }
                </p>
                <section className='w-32'>
                    <Logo />
                </section>

                <div className={`absolute top-[10vh] z-50 w-[50vw] block md:hidden transition-all duration-300`}
                    style={{ left: isMenuVisible ? '0%' : '-100%' }} >
                    <AlbumSideBar />
                </div>
            </section>

            <div className=' hidden lg:block lg:w-[20%] w-full px-4 relative'>
                <input type='search' className='w-full relative pl-3 py-2 rounded-2xl text-white bg-primary border-slate-300 border-2' />
                <span className=' absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2'>search</span>
            </div>
            <Menu />
        </div>
    )
}

export default NavbarContainer