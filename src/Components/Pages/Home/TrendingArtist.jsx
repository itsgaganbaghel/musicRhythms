
import TrendingArtistData from "../../utilities/InputData/TopMusicArtist.json"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";

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


const TrendingArtist = () => {

    return (
        <div className='w-full min-h-[38vh] text-light  ' id="trending_Artist">
            <p className=' text-4xl font-serif mb-6 pl-6  font-extrabold'>Trending Artist's - <sup>Coming Soon</sup> </p>
            <div className="w-full px-14">
                <Slider {...settings}>

                    {
                        TrendingArtistData.map((artist, index) => {
                            return (
                                <NavLink state={{ artist }} key={index}>
                                    <figure className='bg-secondary pt-4 px-4 pb-4 rounded-xl w-[250px]  shadow-[inset_5px_-5px_5px_#101215,inset_-5px_5px_5px_#424655]'>
                                        <img src={artist?.imgSrc} className=' w-[200px] rounded-full h-[200px] m-auto object-cover' />
                                        <figcaption className='text-center mt-2 text-[1rem] font-extrabold tracking-wide'>{artist?.name}</figcaption>
                                    </figure>
                                </NavLink>
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}

export default TrendingArtist