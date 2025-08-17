import { lazy, Suspense } from "react";

import Hero from "./Home/Hero";
import FallbackUI from "./Home/FallbackUI";
const NewReleased = lazy(() => import("./Home/NewReleased"));
const RandomSongs = lazy(() => import("./Home/RandomSongs"));
const TopAlbum = lazy(() => import("./Home/TopAlbum"));
const TrendingArtist = lazy(() => import("./Home/TrendingArtist"));
const Footer = lazy(() => import("./Footer"));

const Home = () => {
  return (
    <div className="lg:max-w-[84vw] lg:min-w-[80vw]  min-h-full text-light flex flex-col gap-16 ">
      <Hero />

      <Suspense fallback={<FallbackUI data={"Top Album"} />}>
        <TopAlbum />
      </Suspense>
      <Suspense fallback={<FallbackUI data={"Trending Artist"} />}>
        <TrendingArtist />
      </Suspense>
      <Suspense fallback={<FallbackUI data={"NewReleased"} />}>
        <NewReleased count={6} unique={true} />
      </Suspense>
      <Suspense fallback={<FallbackUI data={"RandomSongs"} />}>
        <RandomSongs count={5} />
      </Suspense>
      <Suspense fallback={<FallbackUI data={"Footer"} />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
