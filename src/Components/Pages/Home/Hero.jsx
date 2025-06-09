import React from 'react'
import heroBg from "../../../assets/heroBg.png"
import { NavLink } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='  md:max-h-[75vh] md:h-[75vh]  overflow-hidden w-full flex flex-col-reverse md:flex-row justify-between  md:pl-10 items-center' id='Hero'>
            <div className='w-full flex flex-col md:block items-center justify-center md:w-[40%] mt-14 '>
                <h2
                    className='text-5xl w-[90%] md:w-full font-extrabold'
                >Feel Your <span className='text-accent font-serif'>Rhythm's</span> in one Place
                </h2>

                <p className=' my-8 mt-10 w-[90%]'>
                    On our website, you can access an amazing collection of popular and new songs. Stream your favorite tracks in high quality and enjoy without interruptions. Whatever your taste in music, we have it all for you!
                </p>

                <div className=' flex gap-4 font-bold '>
                    <NavLink className='bg-accent text-primary  md:px-6 px-3 text-sm md:text-lg py-3 rounded-lg'>
                        Discover Now
                    </NavLink>

                    <NavLink className='text-light  border border-light md:px-6 px-2 py-3  text-sm md:text-lg rounded-lg'>
                        check your favorite Rhythms
                    </NavLink>
                </div>
            </div>
            <img src={heroBg} alt='hero Bg Image'
                className=' h-[105%]  drop-shadow-[0px_10px_14px_rgba(135,206,235,1)]'
            />


        </div>
    )
}

export default Hero