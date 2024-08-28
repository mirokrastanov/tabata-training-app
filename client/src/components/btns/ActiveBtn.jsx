import React from 'react';
import { FaDiscord, FaRegUser } from 'react-icons/fa6';
import { MdAlternateEmail } from 'react-icons/md';

function ActiveBtn({
    handler, text, square = false, left87 = false, icon = true,
    btnType = 'button', iconOnly = false,
}) {
    const iTextSize = iconOnly ? ' text-2xl ' : ' text-3xl ';

    
    return (
        <button className={`${square ? 'w-11 ' : (left87 ? 'w-[87%] ' : 'w-full ')}h-11 p-0 text-lg flex justify-center items-center bg-purple-900 text-white rounded-lg hover:bg-purple-600 active:bg-purple-500 focus:outline-none border-none transition-all`} onClick={handler} type={btnType}>
            {((icon && text == 'Use Discord') || iconOnly == 'discord') && <FaDiscord className={`${iTextSize}`} />}
            {((icon && text == 'Use Email') || iconOnly == 'email') && <MdAlternateEmail className={`${iTextSize}`} />}
            {((icon && text == 'Use Username') || iconOnly == 'username') && <FaRegUser className={`${iTextSize}`} />}
            {text && (<p className="ml-2 max-custom-mq-300:hidden">{text}</p>)}
        </button>
    )
}

export default ActiveBtn;