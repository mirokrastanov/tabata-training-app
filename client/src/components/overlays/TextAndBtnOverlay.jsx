import React, { useEffect, useState } from 'react';
import ActiveBtn from '../btns/ActiveBtn';
import DotSpinner from '../loaders/base/dotSpinner/DotSpinner';
import { RiDeleteBin2Fill, RiDeleteBin2Line } from 'react-icons/ri';
import { IoMdClose, IoMdCloseCircle } from "react-icons/io";

function TextAndBtnOverlay({ title, text, handleClose, handleMainBtn, btnText }) {
    const [loader, setLoader] = useState(true);

    // useEffect(() => {
    //     setTimeout(() => { setLoader(false) }, 300);
    // }, []);


    return (<>
        <div className="backdrop absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 rounded-lg max-custom-mq-500:rounded-none"></div>
        <div className="on-top absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-md z-30 flex flex-col justify-center items-center w-1/2 max-custom-mq-500:w-3/4 max-custom-mq-300:w-full transition-all">

            {/* ABSOLUTE CLOSE BTN - TOP RIGHT CORNER - BIN ICON */}
            {/* DELETE BTN */}
            <div className="group text-red-600 absolute top-0 right-0 h-12 w-12 flex justify-center items-center cursor-pointer transition-all" onClick={handleClose}>
                <IoMdClose className="h-full w-full p-2 block group-hover:hidden border border-gray-200 rounded rounded-tr-lg rounded-bl-lg" />
                <IoMdCloseCircle className="h-full w-full p-2 hidden group-hover:block group-hover:shadow-lg rounded-lg border border-gray-300" />
            </div>

            {loader ? (<>
                <div className='min-h-80 max-h-full flex justify-center items-center'>
                    <div className='scale-125'>
                        <DotSpinner dark={true} />
                    </div>
                </div>
            </>) : (<>
                <h2>{title}</h2>

                <article className='w-full my-2 flex justify-center items-center'>
                    {text}
                </article>

                <article className='w-full my-2 flex justify-center items-center md:w-[300px]'>
                    <ActiveBtn text={btnText} handler={handleMainBtn} hFit={true} />
                </article>
            </>)}
        </div>
    </>)
}

export default TextAndBtnOverlay;