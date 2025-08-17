import React, { useContext } from "react";
import { RiArrowUpDoubleFill } from "react-icons/ri";
import { addAlbumContext } from "../../Context/SongContext";

const AlbumContent = ({ children }) => {
  let { songIndex } = useContext(addAlbumContext);

  return (
    <div
      className="width-[100%] max-h-[90vh] h-[90vh] overflow-y-scroll "
      style={{
        scrollbarWidth: "none",
      }}
      id="scrollableDiv"
    >
      <button
        onClick={() => {
          document
            .getElementById("scrollableDiv")
            ?.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={` fixed bottom-2  ${
          songIndex !==null  && "bottom-32"
        } right-0 hover:right-2 text-6xl text-gray-300 scrollUp z-50 hover:px-2 hover:py-2 hover:bg-white hover:text-black hover:rounded-[100%] transition-all duration-500 ease-in-out`}
      >
        <RiArrowUpDoubleFill />
      </button>
      {children}
    </div>
  );
};

export default AlbumContent;
