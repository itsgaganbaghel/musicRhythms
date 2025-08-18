import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import AlbumHeaderSection from "./AlbumHeaderSection";
import AlbumSongs from "./AlbumSongs";

const AlbumDetails = () => {
  let stateData = useLocation();
  let { album } = stateData.state;
  return (
    <div className="w-full lg:w-[86vw] relative pb-[17vh] md:pb-[10vh]">
      <AlbumHeaderSection album={album} />
      <AlbumSongs album={album} />
    </div>
  );
};

export default AlbumDetails;
