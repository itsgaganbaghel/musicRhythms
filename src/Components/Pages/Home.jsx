
import Footer from './Footer';
import Hero from './Home/Hero';
import NewReleased from './Home/NewReleased';
import RandomSongs from './Home/RandomSongs';
import TopAlbum from './Home/TopAlbum';
import TrendingArtist from './Home/TrendingArtist';

const Home = () => {
  return (
    <div className='min-w-[84vw] min-h-full text-light  md:px-10  flex flex-col gap-16 '>
      <Hero />
      <TopAlbum />
      <TrendingArtist />
      <NewReleased count={5} unique={true} />
      <RandomSongs count={11} />
      <Footer />

    </div>

  )
}

export default Home