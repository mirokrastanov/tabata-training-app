import React, { useEffect, useState } from 'react';
import ActiveBtn from './ActiveBtn';
import VBtn2Separators from './VBtn2Separators';
import Dots from '../loaders/base/dots/Dots';

function ConfirmBtn({ text, rHandler, scroll }) {
    const [confirmView, setConfirmView] = useState(false);

    useEffect(() => {
        if (confirmView) {
            setTimeout(() => {
                scroll();
            }, 100);
        }
    }, [confirmView]);

    return (<>
        {confirmView
            ? (<>
                <div className='bg-purple-600 cursor-not-allowed rounded-lg text-lg font-semibold transition-all h-11 mb-2 flex justify-center items-center flex-col'>
                    <p>{text}</p>
                </div>
                <div className='flex'>
                    <ActiveBtn iconOnly={'no'} handler={() => setConfirmView(false)} />
                    <p className="py-2 text-xl text-gray-800">|</p>
                    <ActiveBtn iconOnly={'yes'} handler={rHandler} />
                </div>
            </>) : (<>
                <ActiveBtn text={text} handler={() => setConfirmView(true)} />
            </>)}
    </>)
}

export default ConfirmBtn;