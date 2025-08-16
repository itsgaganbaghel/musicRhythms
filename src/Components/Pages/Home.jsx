import Footer from "./Footer";
import Hero from "./Home/Hero";
import NewReleased from "./Home/NewReleased";
import RandomSongs from "./Home/RandomSongs";
import TopAlbum from "./Home/TopAlbum";
import TrendingArtist from "./Home/TrendingArtist";

const Home = () => {
  return (
    <div className="lg:max-w-[84vw] lg:min-w-[80vw]  min-h-full text-light flex flex-col gap-16 ">
      <Hero />
      <TopAlbum />
      <TrendingArtist />
      <NewReleased count={6} unique={true} />
      <RandomSongs count={5} />
      <Footer />
    </div>
  );
};

export default Home;
