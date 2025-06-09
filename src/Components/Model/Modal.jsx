import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { modalProviderContext } from "../Context/ModalContext";

const Modal = ({ children }) => {
    let { isVisibility, setVisibility, setTargetModel } = useContext(modalProviderContext)

    const [animate, setAnimate] = useState(false);
    useEffect(() => {
        if (isVisibility) {
            setAnimate(true)
        } else {
            setAnimate(false);
        }
    }, [isVisibility]);

    return ReactDOM.createPortal(
        <section className={`z-50   absolute inset-0 flex justify-center items-center bg-black/60 `}
            onClick={() => {
                setAnimate(false); 
                setTimeout(() => {
                    setVisibility(false);
                    setTargetModel(null);
                }, 500);
            }}>
            <article className={` max-w-[70%] w-fit   flex justify-center transition-all duration-1000 rounded shadow-lg ${animate ? "scale-100" : "scale-0"}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </article>
        </section >,
        document.getElementById("model")
    );
};


export default Modal