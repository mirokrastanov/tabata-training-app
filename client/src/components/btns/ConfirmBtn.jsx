import React, { useEffect, useState } from 'react';
import ActiveBtn from './ActiveBtn';

function ConfirmBtn({ text, rHandler, scroll, btnType = 'button', v, setV, setW }) {

    useEffect(() => {
        if (v) {
            setTimeout(() => {
                scroll();
            }, 100);
        }
    }, [v]);

    return (<>
        {v
            ? (<>
                <div className='bg-purple-600 cursor-not-allowed rounded-lg text-lg font-semibold transition-all h-11 mb-2 flex justify-center items-center flex-col'>
                    <p>{text}</p>
                </div>
                <div className='flex'>
                    <ActiveBtn iconOnly={'no'} handler={() => setV(false)} />
                    <p className="py-2 text-xl text-gray-800">|</p>
                    <ActiveBtn iconOnly={'yes'} handler={rHandler} btnType={btnType} />
                </div>
            </>) : (<>
                <ActiveBtn text={text} handler={() => { setV(true); setW(false) }} />
            </>)}
    </>)
}

export default ConfirmBtn;