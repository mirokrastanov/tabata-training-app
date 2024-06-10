import React from 'react';
import Spinner from '../spinner/Spinner';

export default function PageLoader() {
    return (
        <div className='page-loader-cage w-full h-[30vh] flex justify-center items-center z-[5]'>
            <Spinner />
        </div>
    )
}