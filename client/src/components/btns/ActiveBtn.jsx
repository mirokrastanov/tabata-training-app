import React from 'react';
import { FaDiscord } from 'react-icons/fa6';
import { MdAlternateEmail } from 'react-icons/md';

function ActiveBtn({ handler, text, square = false, left87 = false, icon = true, btnType = 'button' }) {


    return (
        <button className={`${square ? 'w-11 ' : (left87 ? 'w-[87%] ' : 'w-full ')}  h-11 text-lg flex justify-center items-center gap-4 bg-purple-900 text-white my-2 py-2 rounded-lg hover:bg-purple-600 active:bg-purple-500 focus:outline-none border-none transition-all`} onClick={handler} type={btnType}>
            {icon && (<>
                {text == 'Use Discord' && <FaDiscord className="text-3xl" />}
                {text == 'Use Email' && <MdAlternateEmail className="text-3xl" />}
            </>)}
            <p className="max-custom-mq-300:hidden">{text}</p>
        </button>
    )
}

export default ActiveBtn;