import React from 'react';
import Spinner from '../spinner/Spinner';
import HorizontalLoader from '../horizontalLoader/HorizontalLoader';

export default function BtnLoader() {
    return (
        <div className='btn-loader-cage z-[5] p-0 flex justify-center items-center scale-75'>
            <HorizontalLoader />
        </div>
    )
}