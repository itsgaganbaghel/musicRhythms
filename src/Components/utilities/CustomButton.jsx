import React from "react";

const CustomButton = ({ children }) => {
    return (
        <div className=" w-full h-full">
            <style>
              {`
        .border {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity:0;
          border: 2px solid rgb(252 217 184 );
          border-radius: 1.5rem;
        }

        .button:hover .border {
        opacity:100%;
          animation: borderMove 1.5s linear infinite;
        }

        @keyframes borderMove {
          0% {
            clip-path: inset(0% 0% 100% 0%);
          }
          25% {
            clip-path: inset(0% 0% 0% 100%);
          }
          50% {
            clip-path: inset(100% 0% 0% 0%);
          }
          75% {
            clip-path: inset(0% 100% 0% 0%);
          }
          100% {
            clip-path: inset(0% 0% 100% 0%);
          }
        }
      `}</style>

            <button className="button group w-full h-full">
                <div className="w-full h-full  flex  flex-col justify-center ">
                    {/* Hover Me */}
                    {children}
                </div>

                <span className="border"></span>
            </button>
        </div>
    );
};

export default CustomButton;
