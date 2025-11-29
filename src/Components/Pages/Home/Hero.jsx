import React, { useCallback, useContext } from "react";
import heroBg from "../../../assets/heroBg.png";
import { NavLink } from "react-router-dom";
import { AuthUserContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

const Hero = () => {
  let { authUserData } = useContext(AuthUserContext);

  let handleLikedSongNavLink = useCallback(() => {
    if (!authUserData?.uid) {
      toast.error("login First");
    } else {
      toast.success("Your Liked Rhythms");
    }
  }, [authUserData?.uid]);
  return (
    <div
      className="  lg:max-h-[75vh] lg:h-[65vh] xl:h-[70vh]  overflow-hidden w-full flex flex-col-reverse lg:flex-row justify-between  lg:pl-10 items-center  "
      id="Hero"
    >
      <div className="w-[94vw] flex flex-col lg:block items-center justify-center lg:w-[55%] mt-14 lg:px-0  ">
        <h2 className="text-3xl md:text-4xl md:text-center lg:text-start lg:text-4xl xl:w-[90%] xl:text-5xl w-[90%] lg:w-full font-extrabold">
          Feel Your <span className="text-accent font-serif">Rhythm's</span> in
          one Place
        </h2>

        <p className=" my-8 mt-10 w-[90%] md:text-xl lg:text-[16px] text-sm text-center lg:text-start">
          On our website, you can access an amazing collection of popular and
          new songs. Stream your favorite tracks in high quality and enjoy
          without interruptions. Whatever your taste in music, we have it all
          for you!
        </p>

        <div className=" flex gap-4 font-bold ">
          <a
            href="#top_Album"
            className="bg-accent text-primary lg:text-center  md:px-6  px-3 text-sm md:text-lg py-3 rounded-lg"
          >
            Discover Now
          </a>

          <NavLink
            to={"/user/FavoriteSongs"}
            onClick={handleLikedSongNavLink}
            className="text-light lg:text-center   border border-light md:px-6 px-2 py-3  text-sm  rounded-lg"
          >
            check your favorite Rhythms
          </NavLink>
        </div>
      </div>
      <img
        src={
          "https://res.cloudinary.com/dgdkrgtlv/image/upload/v1755466276/ripanrnsftek5nbzaacc.png"
        }
        alt="hero Bg Image"
        className=" lg:w-[45%] md:w-[60%] drop-shadow-[0px_10px_14px_rgba(135,206,235,1)] lg:scale-110  xl:scale-100"
      />
    </div>
  );
};

export default Hero;
