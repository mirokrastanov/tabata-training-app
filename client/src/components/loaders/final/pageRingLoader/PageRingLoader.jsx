import React from 'react';
import './PageRingLoader.css'
import Ring from '../../base/ring/Ring';

function PageRingLoader() {
    return (
        <div className="h-[calc(100%-3.5rem)] bg-gray-100 flex flex-col items-center p-6 rounded-b-xl">
            <div className="bg-white shadow-md rounded-lg w-full max-w-4xl h-[calc(100%-1rem)] pt-5 items-center">
                <Ring />
                <div className="flex gap-[5%] flex-wrap justify-center h-[80%]">
                    {new Array(4).fill(0).map((x,i1) => <div key={i1 + '--lds'} className="w-[40%] h-[45%] bg-gray-100 rounded-lg shadow-md skeleton-anim flex flex-wrap justify-center items-center gap-x-[5%]">
                        {new Array(12).fill(0).map((y, i2) => <div key={i2 + '--lid'} className="topper-line h-[7%] w-[40%] rounded-md bg-gray-300/30"></div>)}
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default PageRingLoader;