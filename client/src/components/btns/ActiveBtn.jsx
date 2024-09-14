import React from 'react';
import { FaArrowRightToBracket, FaDiscord, FaFolderPlus, FaPlus, FaUserPlus } from 'react-icons/fa6';

function ActiveBtn({
    handler, text, square = false, left87 = false, icon = true,
    btnType = 'button', iconOnly = false,
}) {
    const iTextSize = iconOnly ? ' text-2xl ' : ' text-3xl ';
    const width = square ? 'w-11 ' : (left87 ? 'w-[87%] ' : 'w-full ')
    const height = text == 'Create Workout' ? 'h-11 max-custom-mq-300:h-fit max-custom-mq-300:min-h-11' : 'h-11 ';

    return (
        <button className={`group transition-all ${width} ${height} p-0 text-lg flex justify-center items-center bg-purple-900 text-white rounded-lg hover:bg-purple-600 active:bg-purple-500 focus:outline-none border-none transition-all`} onClick={handler} type={btnType}>
            {((icon && text == 'Use Discord') || iconOnly == 'discord') && <FaDiscord className={`${iTextSize}`} />}
            {((icon && text == 'Create Account') || iconOnly == 'signup') && <FaUserPlus className={`${iTextSize}`} />}
            {((icon && text == 'Use Credentials') || iconOnly == 'signin') && <FaArrowRightToBracket className={`${iTextSize}`} />}
            {(icon && text == 'Add Exercise') && <FaPlus className={`${iTextSize} p-1 group-active:p-0.5 transition-all duration-100 max-custom-mq-300:hidden`} />}
            {(icon && text == 'Create Workout') && <FaFolderPlus className={`${iTextSize} p-1 group-active:p-0.5 transition-all duration-100 max-custom-mq-300:hidden`} />}
            {text && (<p className={`ml-2 ${text == 'Add Exercise' || text == 'Create Workout' ? '' : 'max-custom-mq-300:hidden'}`}>{text}</p>)}
        </button>
    )
}

export default ActiveBtn;