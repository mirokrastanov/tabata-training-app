import React from 'react';

function TextAnd2BtnsOverlay({ title, text, lHandler, rHandler, lBtnText, rBtnText }) {
    return (<>
        <div className="backdrop absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 rounded-lg max-custom-mq-500:rounded-none"></div>
        <div className="on-top absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-md z-30 flex justify-center items-center">
            <h2>{title}</h2>

            <article>
                {text}
            </article>

            <article>
                <button onClick={lHandler}>{lBtnText}</button>
                <button onClick={rHandler}>{rBtnText}</button>
            </article>
        </div>
    </>)
}

export default TextAnd2BtnsOverlay;