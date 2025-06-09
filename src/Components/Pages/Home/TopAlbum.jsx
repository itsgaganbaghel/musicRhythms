import React, { useContext } from 'react'
import { addAlbumContext } from '../../Context/SongContext';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from 'react-router-dom';
import { RiPlayLargeLine } from 'react-icons/ri';


const TopAlbum = () => {

    let { allAlbums } = useContext(addAlbumContext || [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024, // Tablet or medium screens (<= 1024px)
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768, // Mobile screens (<= 768px)
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    

    return (
        <div className='w-full min-h-[38vh] text-light   ' id='top_Album'>
            <p className=' text-4xl font-serif mb-6 pl-6  font-extrabold'> Top Albums</p>
            {
                allAlbums.length > 0 &&
                <div className='w-full md:px-14 '>
                    <Slider  {...settings}>
                        {
                            allAlbums?.length > 0 &&
                            allAlbums.map((album, index) => {
                                return (
                                    <NavLink to={`/album/${album.id}`} state={{ album }} key={index}>
                                        <figure className='bg-secondary pt-4 px-4 pb-4 rounded-xl w-[250px] shadow-[inset_5px_-5px_5px_#101215,inset_-5px_5px_5px_#424655]'>
                                            <div className='group relative w-[200px] mx-auto h-[200px] '>
                                                <div className='absolute inset-0 bg-black/70 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer rounded-lg'>
                                                    <p className='text-6xl text-white  ' >
                                                        <RiPlayLargeLine />
                                                    </p>
                                                </div>

                                                <img src={album?.albumThumbnail} className='  rounded-lg w-full h-[200px] mx-auto =' alt={album?.albumName} />
                                            </div>
                                            <figcaption className='text-center mt-2 text-[1rem] font-extrabold tracking-wide'>{album?.albumName}</figcaption>
                                        </figure>
                                    </NavLink>

                                )
                            })
                        }
                        {
                            allAlbums?.length > 0 &&
                            allAlbums.map((album, index) => {
                                return (
                                    <NavLink to={`/album/${album.id}`} state={{ album }} key={index}>
                                        <figure className='bg-secondary pt-4 px-4 pb-4 rounded-xl w-[250px] =  shadow-[inset_5px_-5px_5px_#101215,inset_-5px_5px_5px_#424655]'>
                                            <div className='group relative w-[200px] mx-auto   h-[200px] '>
                                                <div className='absolute inset-0  bg-black/70 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer rounded-lg'>
                                                    <p className='text-6xl text-white  ' >
                                                        <RiPlayLargeLine />
                                                    </p>
                                                </div>

                                                <img src={album?.albumThumbnail} className='  rounded-lg w-full h-[200px] mx-auto =' alt={album?.albumName} />
                                            </div>
                                            <figcaption className='text-center mt-2 text-[1rem] font-extrabold tracking-wide'>{album?.albumName}</figcaption>
                                        </figure>
                                    </NavLink>

                                )
                            })
                        }



                    </Slider>
                </div>
            }


        </div>

    )
}

export default TopAlbum