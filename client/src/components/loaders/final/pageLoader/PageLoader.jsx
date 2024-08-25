import React from 'react';
import Wave from '../../base/wave/Wave';

export default function PageLoader() {
    return (
        <div className='page-loader-cage w-full h-[30vh] min-h-[30vh] flex justify-center items-center z-[5]'>
            <Wave />
        </div>
    )
}