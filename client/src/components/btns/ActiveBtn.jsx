import React from 'react';
import { FaArrowRightToBracket, FaDiscord, FaDumbbell, FaFolderPlus, FaPlus, FaUserPlus } from 'react-icons/fa6';
import {
    MdDownloading, MdOutlineNetworkWifi2Bar, MdOutlineNetworkWifi3Bar, MdOutlineSignalWifi4Bar
} from "react-icons/md";

function ActiveBtn({
    handler, text, square = false, left87 = false, icon = true,
    btnType = 'button', iconOnly = false, addMy, preset
}) {
    const iTextSize = iconOnly ? ' text-2xl ' : ' text-3xl ';
    const width = square ? 'w-11 ' : (left87 ? 'w-[87%] ' : 'w-full ')
    const height = text == 'Create Workout' ? 'h-11 max-custom-mq-300:h-fit max-custom-mq-300:min-h-11' : 'h-11 ';
    const my = addMy ? `my-${addMy}` : '';
    const exerciseBtn = ' p-1 group-active:p-0.5 transition-all duration-100 max-custom-mq-300:hidden ';

    return (<button className={`group transition-all ${width} ${height} ${my} p-0 text-lg flex justify-center items-center bg-purple-900 text-white rounded-lg hover:bg-purple-600 active:bg-purple-500 focus:outline-none border-none transition-all`} onClick={handler} type={btnType} data-preset={preset}>

        {/* ICONS */}
        {((icon && text == 'Use Discord') || iconOnly == 'discord') && <FaDiscord className={`${iTextSize}`} />}
        {((icon && text == 'Create Account') || iconOnly == 'signup') && <FaUserPlus className={`${iTextSize}`} />}
        {((icon && text == 'Use Credentials')
            || iconOnly == 'signin') && <FaArrowRightToBracket className={`${iTextSize}`} />}

        {/* EXERCISE ICONS */}
        {(icon && text == 'Add Exercise') && <FaDumbbell className={`${iTextSize}${exerciseBtn} rotate-[315deg]`} />}
        {(icon && (text == 'Create Workout'
            || text == 'Create New')) && <FaFolderPlus className={`${iTextSize}${exerciseBtn}`} />}
        {(icon && text == 'Load Preset') && <MdDownloading className={`${iTextSize}${exerciseBtn}`} />}
        {(icon && text == 'Standard HIIT') && <MdOutlineNetworkWifi2Bar className={`${iTextSize}${exerciseBtn}`} />}
        {(icon && text == 'Intermediate HIIT') && <MdOutlineNetworkWifi3Bar className={`${iTextSize}${exerciseBtn}`} />}
        {(icon && text == 'Advanced HIIT') && <MdOutlineSignalWifi4Bar className={`${iTextSize}${exerciseBtn}`} />}

        {/* TEXT */}
        {text && (<p data-preset={preset}
            className={`ml-2 ${text == 'Add Exercise' || text == 'Create Workout' ? 'max-custom-mq-300:ml-0' : ''}`}
        >{text}</p>)}

    </button>)
}

export default ActiveBtn;