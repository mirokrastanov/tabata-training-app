import React from 'react';

function HBtnSeparator() {
    return (
        <div className="flex w-full justify-center items-center">
            <hr className="border-0 ml-4 border-t-4 flex-1 z-[1]" />
            <p className="text-black text-lg px-2">or</p>
            <hr className="border-0 mr-4 border-t-4 flex-1 z-[1]" />
        </div>
    )
}

export default HBtnSeparator;