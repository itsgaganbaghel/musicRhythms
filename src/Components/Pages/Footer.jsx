import { FaXTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa6";

import logo from "../../assets/logo.png"
import { useContext } from "react";
import { addAlbumContext } from "../Context/SongContext";


const Footer = () => {

    let { audioPlayerData } = useContext(addAlbumContext)

    return (
        <footer className={`bg-primary border-t-2 border-t-secondary/80   text-gray-300 py-4 px-5
        ${audioPlayerData.length > 0 && "mb-[15vh]"}`}>
            <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div>
                    <h3 className="text-white font-semibold mb-2">TOP ARTISTS</h3>
                    <ul className="space-y-1">
                        {["Arijit Singh", "King", "Honey Singh", "Badshah", "Diljit Dosanjh"].map((artist, index) => (
                            <li key={index} className="hover:text-white cursor-pointer">{artist}</li>
                        ))}
                    </ul>
                </div>

                {/* <div>
                    <h3 className="text-white font-semibold mb-2">TOP ACTORS</h3>
                    <ul className="space-y-1">
                        {["Salman Khan", "Allu Arjun", "Sunny Leone", "Amitabh Bachchan", "Varun Dhawan"].map((actor, index) => (
                            <li key={index} className="hover:text-white cursor-pointer">{actor}</li>
                        ))}
                    </ul>
                    <h3 className="text-white font-semibold mt-4 mb-2">BROWSE</h3>
                    <ul className="space-y-1">
                        {["New Releases", "Featured Playlists", "Weekly Top Songs", "Top Artists", "Top Charts", "Top Radios"].map((item, index) => (
                            <li key={index} className="hover:text-white cursor-pointer">{item}</li>
                        ))}
                    </ul>
                </div> */}

                <div>
                    <h3 className="text-white font-semibold mb-2">DEVOTIONAL SONGS</h3>
                    <ul className="space-y-1">
                        {["Mahadev ji",
                            "Krishna ji",
                            "Shri Ram ji",
                            "Hanuman ji",
                            "Shri Narayan ji",].map((song, index) => (
                                <li key={index} className="hover:text-white cursor-pointer">{song}</li>
                            ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-2">LANGUAGE</h3>
                    <ul className="space-y-1">
                        {["Hindi Songs", "Punjabi Songs", "Rajasthani Songs", "Haryanvi Songs", "English Songs"].map((lang, index) => (
                            <li key={index} className="hover:text-white cursor-pointer">{lang}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <img src={logo} className="w-[70%]" />
                    <div className="flex justify-start gap-4 mt-4 pl-6   ">
                        <FaGithub className="cursor-pointer hover:text-white text-2xl" />
                        <FaLinkedinIn className="cursor-pointer hover:text-white text-2xl" />
                        <FaXTwitter className="cursor-pointer hover:text-white text-2xl" />
                        <FaInstagram className="cursor-pointer hover:text-white text-2xl" />
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-6 pt-6 text-center text-sm">

                <p className="text-gray-500 text-[1rem]">Rhythm Made by lots of 💖 by Gagan Baghel</p>
                <p className="text-gray-500 pt-4">© 2025 Rhythm All rights reserved.</p>


            </div>
        </footer>
    );
};

export default Footer;
