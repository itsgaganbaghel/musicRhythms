import React from "react";
import heroBg from "../../../assets/heroBg.png";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="  lg:max-h-[75vh] lg:h-[75vh]  overflow-hidden w-full flex flex-col-reverse lg:flex-row justify-between  lg:pl-10 items-center "
      id="Hero"
    >
      <div className="w-[94vw] flex flex-col lg:block items-center justify-center lg:w-[55%] mt-14 lg:px-0  ">
        <h2 className="text-3xl md:text-4xl md:text-center lg:text-start lg:text-4xl xl:w-[90%] xl:text-5xl w-[90%] lg:w-full font-extrabold">
          Feel Your <span className="text-accent font-serif">Rhythm's</span> in
          one Place
        </h2>

        <p className=" my-8 mt-10 w-[90%] md:text-xl lg:text-lg text-sm text-center lg:text-start">
          On our website, you can access an amazing collection of popular and
          new songs. Stream your favorite tracks in high quality and enjoy
          without interruptions. Whatever your taste in music, we have it all
          for you!
        </p>

        <div className=" flex gap-4 font-bold ">
          <NavLink className="bg-accent text-primary lg:text-center  md:px-6  px-3 text-sm md:text-lg py-3 rounded-lg">
            Discover Now
          </NavLink>

          <NavLink className="text-light lg:text-center   border border-light md:px-6 px-2 py-3  text-sm md:text-lg rounded-lg">
            check your favorite Rhythms
          </NavLink>
        </div>
      </div>
      <img
        src={heroBg}
        alt="hero Bg Image"
        className=" lg:w-[45%] md:w-[60%] drop-shadow-[0px_10px_14px_rgba(135,206,235,1)]"
      />
    </div>
  );
};

export default Hero;
