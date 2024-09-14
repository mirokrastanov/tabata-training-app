import React from 'react';
import BtnLoader from '../loaders/final/btnLoader/btnLoader';

function InactiveBtn({ loader = 'wave', square = false, left87 = false, left74 = false }) {
    const conditionalWidth = `${left87 ? 'w-[87%] ' : (left74 ? 'w-[74%]' : 'w-full ')}`;


    return (
        <button disabled className={`${square ? 'w-11 ' : conditionalWidth} h-11 flex justify-center items-center bg-slate-500 p-0 rounded-lg cursor-not-allowed focus:outline-none border-none transition-all`}>
            <BtnLoader loader={loader} />
        </button>
    )
}

export default InactiveBtn;