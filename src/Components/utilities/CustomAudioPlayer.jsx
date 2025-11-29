// AudioPlayer.jsx
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { FaPause, FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySharp,
} from "react-icons/io5";
import { BiSolidVolumeMute } from "react-icons/bi";
import { ImLoop } from "react-icons/im";
import { FaRegHeart } from "react-icons/fa";
import { RiDislikeLine } from "react-icons/ri";
import { addAlbumContext } from "../Context/SongContext";
import toast from "react-hot-toast";
import { __DB } from "../../Backend/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { AuthUserContext } from "../Context/AuthContext";

const CustomAudioPlayer = ({ tracks }) => {
  // console.log(tracks);

  let { songIndex, setSongIndex, isPlaying, setIsPlaying } =
    useContext(addAlbumContext);

  let { profileData, authUserData } = useContext(AuthUserContext);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isMute, setIsMute] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  const currentTrack = useMemo(() => tracks[songIndex], [tracks, songIndex]);

  const {
    songName: title,
    songActors: artist,
    color,
    songThumbnail: image,
    songUrl: audioSrc,
  } = currentTrack;

  useEffect(() => {
    setTrackIndex(songIndex);
    // console.log(songIndex);
  }, [songIndex]);

  const [trackProgress, setTrackProgress] = useState(0);

  const [volume, setVolume] = useState(1); // Initial volume set to 50%

  const audioRef = useRef(new Audio(tracks[songIndex].audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((e) => console.log("Playback error:", e));
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioSrc) return;

    audioRef.current.pause();
    audioRef.current.src = audioSrc; // Instead of creating a new Audio instance
    audioRef.current.volume = volume;
    setTrackProgress(0); // Reset progress for new song

    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    }
  }, [trackIndex, audioSrc]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, [setIsPlaying]);

  const handleNextTrack = useCallback(() => {
    setSongIndex((prev) => (prev < tracks.length - 1 ? prev + 1 : 0));
    setIsPlaying(true);
  }, [setSongIndex, setIsPlaying, tracks.length]);

  const handlePrevTrack = useCallback(() => {
    setSongIndex((prev) => (prev > 0 ? prev - 1 : tracks.length - 1));
    setIsPlaying(true);
  }, [setSongIndex, setIsPlaying, tracks.length]);

  const increaseVolume = useCallback(() => {
    setVolume((prevVolume) =>
      prevVolume < 1 ? Number((prevVolume + 0.1).toFixed(1)) : 1
    );
  }, []);

  const decreaseVolume = useCallback(() => {
    setVolume((prevVolume) =>
      prevVolume > 0 ? Number((prevVolume - 0.1).toFixed(1)) : 0
    );
  }, []);

  const muteVolume = useCallback(() => {
    if (isMute) {
      toast.success("mute");
      setVolume(0);
      setIsMute(false);
    } else {
      toast.success("Unmute");
      setVolume(0.5);
      setIsMute(true);
    }
  }, [isMute]);

  const onScrub = useCallback((value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  }, []);

  const onScrubEnd = useCallback(() => {
    if (isPlaying) {
      startTimer();
    }
  }, [isPlaying, startTimer]);

  const currentPercentage = useMemo(
    () => (duration ? `${(trackProgress / duration) * 100}%` : "0%"),
    [trackProgress, duration]
  );

  const trackStyling = useMemo(
    () => `
      -webkit-gradient(linear, left top, right top,
        color-stop(${currentPercentage}, #FFDDBB),
        color-stop(${currentPercentage}, #7777))
    `,
    [currentPercentage]
  );

  const volumeStyling = useMemo(
    () => `
      -webkit-gradient(linear, left top, right top,
      color-stop(${volume}, #FFDDBB),
      color-stop(${volume}, #7777))
    `,
    [volume]
  );

  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, []);

  // ! add to fav songs
  let isSongExists = useMemo(
    () =>
      profileData?.favouriteSongs?.some(
        (v) => v.songName === currentTrack.songName
      ),
    [profileData, currentTrack]
  );

  const handleFavouriteSongs = useCallback(
    async (song) => {
      if (!authUserData?.uid) {
        toast.error("Login first");
        return;
      }
      let payload = {};
      if (isSongExists) {
        payload = {
          ...profileData,
          favouriteSongs: profileData?.favouriteSongs.filter(
            (v) => v.songName !== song.songName
          ),
        };
      } else {
        payload = {
          ...profileData,
          favouriteSongs: [...(profileData?.favouriteSongs || []), song],
        };
      }

      try {
        await setDoc(doc(__DB, "user_Profile", authUserData?.uid), payload);
        isSongExists
          ? toast.success("Song is removed in Your Favourites")
          : toast.success("Song is added in Your Favourites");
        setIsFavourite(true);
      } catch (error) {
        toast.error("Failed to update favourites");
        toast.error(error.code.slice(5));
      }
    },
    [authUserData, profileData, isSongExists, currentTrack]
  );

  return (
    <div className="flex flex-col md:flex-row  md:max-h-[15vh] min-h-[10vh] md:items-center  bg-secondary shadow-2xl text-white w-[100vw] relative overflow-y-hidden px-4 py-4 gap-2">
      <div className="min-w-[15%]  h-full flex justify-start items-center gap-4   ">
        <img
          src={image}
          alt={`Artwork for ${title}`}
          title={`Thumbnail of ${title}`}
          className={`w-12 h-12 rounded-full  ${
            isPlaying == true ? "custom-spin" : ""
          }`}
        />

        <div className="ml-[5%] md:ml-0">
          <h2 className=" font-semibold">{title}</h2>
          <p className="text-gray-400 text-sm">{artist}</p>
        </div>
      </div>

      <div className="md:w-[70%] w-full justify-center  h-full  ">
        <div className="w-full flex items-center justify-center gap-6   ">
          <button
            onClick={muteVolume}
            className={` hidden md:block text-gray-500 hover:text-white focus:outline-none  p-2 rounded-full  ml-10`}
            title="mute"
          >
            <BiSolidVolumeMute />
          </button>

          <button
            onClick={handlePrevTrack}
            className="text-gray-500 text-xl hover:text-white focus:outline-none"
            title="Previous Song"
          >
            <IoPlayBackSharp />
          </button>

          <button
            onClick={handlePlayPause}
            className="text-gray-500 hover:text-white focus:outline-none text-xl"
            title={isPlaying === true ? "Pause Song" : "Play Song"}
          >
            {isPlaying ? <FaPause /> : <IoPlaySharp />}
          </button>

          <button
            onClick={handleNextTrack}
            className="text-gray-500 text-xl hover:text-white focus:outline-none"
            title="Next Song"
          >
            <IoPlayForwardSharp />
          </button>

          <button
            className="text-gray-500 hover:text-white focus:outline-none ml-2 hidden md:block "
            title="allow music on loop "
          >
            <ImLoop />
          </button>

          <button
            className="text-gray-500 hover:text-white focus:outline-none ml-2 "
            title={
              isSongExists === true
                ? "Remove From the Favorite"
                : "Add From the Favorite"
            }
            onClick={() => handleFavouriteSongs(tracks[songIndex])}
          >
            {isSongExists === true ? <RiDislikeLine /> : <FaRegHeart />}
          </button>
        </div>

        <div className="  w-full flex justify-center items-center gap-6 text-gray-400  ">
          <p className="text-xl pb-1">{formatTime(trackProgress)}</p>
          <input
            type="range"
            value={trackProgress}
            step="1"
            min="0"
            max={duration ? duration : `${duration}`}
            className="w-[60%] bg-gray-700 rounded-full appearance-none h-1"
            style={{ background: trackStyling }}
            onChange={(e) => onScrub(e.target.value)}
            onMouseUp={onScrubEnd}
            onTouchend={onScrubEnd}
          />
          <p className="text-xl pb-1">
            {duration ? formatTime(duration) : "--/--"}
          </p>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="hidden md:flex justify-end  min-w-[15%] max-w-[15%]   ">
        <button
          onClick={decreaseVolume}
          className={`text-gray-500 hover:text-white focus:outline-none  p-2 rounded-full bg-primary ${
            volume === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={volume === 0}
          title="Volume Down"
        >
          <FaVolumeDown />
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          style={{ background: volumeStyling }}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-16 py-2 rounded-full appearance-none  -rotate-90 shadow-[5px_5px_30px_rgba(20,20,20,0.8),5px_5px_30px_rgba(60,60,60,0.8)] bg-primary text-white border-2 border-gray-500 cursor-grab "
          title="Volume Slider"
        />

        <button
          onClick={increaseVolume}
          className={`text-gray-500 hover:text-white focus:outline-none p-2 rounded-full bg-primary ${
            volume === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={volume === 1}
          title="Volume Up"
        >
          <FaVolumeUp />
        </button>
      </div>

      {/* remove audio player */}
      {/* <p className='absolute top-0 right-1 cursor-pointer' onClick={() => setAudioPlayerData([])} title='close music player'>❌</p> */}
    </div>
  );
};

export default CustomAudioPlayer;
