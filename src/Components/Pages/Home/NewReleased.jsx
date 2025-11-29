import React, { useContext, useEffect, useState } from "react";
import { addAlbumContext } from "../../Context/SongContext";
import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { RiPlayLargeLine } from "react-icons/ri";
import gif from "../../../assets/playing.gif";

const NewReleased = ({ count, unique = false }) => {
  let {
    allSongs,
    audioPlayerData,
    setAudioPlayerData,
    setSongIndex,
    songIndex,
  } = useContext(addAlbumContext);
  let { isPlaying, setIsPlaying } = useContext(addAlbumContext);
  let [allSortedSongs, setAllSortedSongs] = useState([]);

  let findSortedArrayOfSongs = () => {
    let sortedSongs = [...allSongs].sort(
      (a, b) => new Date(b.songReleasedDate) - new Date(a.songReleasedDate)
    );
    let uniqueSongs = [];
    let seenDates = new Set();
    if (unique) {
      for (let song of sortedSongs) {
        let releaseDate = new Date(song.songReleasedDate)
          .toISOString()
          .split("T")[0]; // Extract YYYY-MM-DD format
        if (!seenDates.has(releaseDate)) {
          seenDates.add(releaseDate);
          uniqueSongs.push(song);
        }
        if (uniqueSongs.length >= (count ? count : allSongs.length)) break; // Stop if we reach the required count
      }

      setAllSortedSongs(uniqueSongs);
    } else {
      setAllSortedSongs(sortedSongs.filter((_, i) => i < count));
    }
  };

  useEffect(() => {
    findSortedArrayOfSongs();
  }, [allSongs]);

  let handleAudio = (index) => {
    setAudioPlayerData(allSortedSongs);
    setSongIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="w-full min-h-[38vh] text-light" id="new_Release">
      <p className=" text-4xl font-serif mb-6 pl-8  font-extrabold">
        New Released
      </p>
      <div className="w-full flex md:flex-row flex-col justify-center items-center md:flex-wrap  gap-20  px-14 relative">
        {allSortedSongs.length > 0 &&
          allSortedSongs.map((song, index) => (
            <figure
              className=" w-[225px] md:w-[150px] relative  cursor-pointer"
              key={index}
            >
              <div className="group relative w-[225px]  h-[225px] md:w-[150px] md:h-[150px]">
                {!(
                  audioPlayerData.length > 0 &&
                  audioPlayerData[songIndex].songName == song.songName
                ) && (
                  <div
                    className="absolute inset-0  bg-black/70 flex justify-center items-center opacity-0  group-hover:opacity-100 transition-opacity duration-300 rounded-full cursor-pointe z-10"
                    onClick={() => handleAudio(index)}
                  >
                    <p className="text-6xl text-white  ">
                      <RiPlayLargeLine />
                    </p>
                  </div>
                )}
                {audioPlayerData.length > 0 &&
                  audioPlayerData[songIndex].songName == song.songName &&
                  isPlaying == true && (
                    <div
                      className="absolute  bottom-0 w-full h-full bg-gradient-to-t from-white to-transparent flex justify-center items-end pb-3 rounded-full cursor-pointer z-20 "
                      onClick={() => handleAudio(index)}
                    >
                      <img src={gif} className="w-[60%] h-[50%]" />
                    </div>
                  )}

                <img
                  src={song?.songThumbnail}
                  className="  rounded-full w-full   h-full  object-cover "
                  alt={song?.songName}
                />
              </div>

              <figcaption className="text-center  mt-2 text-3xl md:text-[1rem] font-extrabold tracking-wide">
                {song?.songName}
              </figcaption>
            </figure>
          ))}
        {/* {count && (
          <NavLink
            to={""}
            state={""}
            className="border-2 border-light flex items-center text-xl gap-3 w-[225px] h-[225px] md:w-[150px] md:h-[150px] rounded-full  justify-center hover:bg-accent hover:text-primary hover:font-serif hover:font-bold hover:drop-shadow-[0px_0px_20px_rgba(135,206,235,0.7)] hover:border-accent"
          >
            <span>Check All</span>
            <span>
              <FaArrowRight />
            </span>
          </NavLink>
        )} */}
      </div>
    </div>
  );
};

export default NewReleased;
