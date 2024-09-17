import React, { useEffect, useState } from 'react';
import './TextAndBtnOverlay.css';
import ActiveBtn from '../../btns/ActiveBtn';
import DotSpinner from '../../loaders/base/dotSpinner/DotSpinner';
import { RiDeleteBin2Fill, RiDeleteBin2Line } from 'react-icons/ri';
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";

function TextAndBtnOverlay({ title, text, handleClose, handleMainBtn, btnText }) {
    const [loader, setLoader] = useState(true);
    const [sub300, setSub300] = useState(false);
    const [sub500, setSub500] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 300) {
                setSub300(true);
                setSub500(false);
            } else if (screenWidth < 500 && screenWidth >= 300) {
                setSub300(false);
                setSub500(true);
            } else {
                setSub300(false);
                setSub500(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        setTimeout(() => { setLoader(false) }, 300);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (<>
        <div className="backdrop absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 rounded-lg max-custom-mq-500:rounded-none"></div>
        <div className="on-top absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-md z-30 flex flex-col justify-center items-center max-md:w-3/4 max-custom-mq-300:w-full transition-all md:w-[600px] py-0 pr-0 max-custom-mq-300:px-0">

            {/* ABSOLUTE CLOSE BTN - TOP RIGHT CORNER - BIN ICON */}
            {/* DELETE BTN */}
            <div className="group text-red-600 absolute top-0 right-0 h-12 w-12 flex justify-center items-center cursor-pointer transition-all max-custom-mq-500:scale-75 max-custom-mq-500:top-[-6px] max-custom-mq-500:right-[-6px] max-custom-mq-300:scale-50 max-custom-mq-300:top-[-12px] max-custom-mq-300:right-[-12px] bg-white rounded-tr-lg" onClick={handleClose}>
                <IoMdClose className="h-full w-full p-2 block group-hover:hidden border border-gray-300 rounded-tr-lg rounded-bl-lg  max-custom-mq-300:p-0" />
                <IoMdCloseCircle className="h-full w-full p-2 hidden group-hover:block group-hover:shadow-lg rounded-lg border border-gray-300  max-custom-mq-300:p-0" />
            </div>

            {loader ? (<>
                <div className='h-80 max-h-full flex justify-center items-center'>
                    <div className='scale-125'>
                        <DotSpinner dark={true} />
                    </div>
                </div>
            </>) : (<div className={`h-custom-e overflow-y-scroll overlay-scroll-area ${sub300 ? 'sub300' : ''} ${sub500 ? 'sub500' : ''} w-full`}>
                <h2 className='top-0 left-0 text-black pt-3 px-0 font-bold text-ellipsis line-clamp-6 w-full tracking-wide rounded-t-lg text-2xl max-md:text-xl max-custom-mq-500:text-lg'>
                    {title}
                </h2>

                <article className='min-h-60 my-2 mx-auto flex flex-col justify-center items-center text-black text-lg max-custom-mq-500:text-[16px] max-custom-mq-300:gap-y-[2px] pl-1 w-fit md:max-w-96'>
                    {text}
                </article>

                <article className='w-[95%] my-8 flex justify-center items-center max-w-[300px] mx-auto'>
                    <ActiveBtn text={btnText} handler={handleMainBtn} hFit={true} />
                </article>
            </div>)}
        </div>
    </>)
}

export default TextAndBtnOverlay;