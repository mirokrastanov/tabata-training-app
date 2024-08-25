import React from 'react';
import Wave from '../../base/wave/Wave';
import Dots from '../../base/dots/Dots';

export default function BtnLoader({ loader = 'wave' }) {

    return (
        <div className='z-[5] flex justify-center items-center'>
            {loader === 'wave' && <Wave />}
            {loader === 'dots' && <Dots />}
        </div>
    )
}