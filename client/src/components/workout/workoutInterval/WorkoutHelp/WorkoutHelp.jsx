import React, { useState } from 'react';
import './WorkoutHelp.css';
import { FaMinus, FaPlus } from 'react-icons/fa6';

function WorkoutHelp() {
    const [isOpen, setIsOpen] = useState(false);
    const sub300 = 'max-custom-mq-300:my-2 max-custom-mq-300:pt-2 max-custom-mq-300:border-t max-custom-mq-300:text-center max-custom-mq-300:border-gray-300';

    return (<>
        <hr className="mx-3 my-3.5" />

        <article onClick={() => setIsOpen(!isOpen)}
            className={`text-gray-800 bg-purple-100 p-1 mb-4 rounded-lg shadow-md border-gray-300 border cursor-pointer accordion`}>
            <p className={`accordion-toggle ${isOpen ? 'open ' : ''} font-bold opacity-100 py-1 flex justify-center items-center relative`}>
                {isOpen ? 'Hide help' : 'Show help'}
                <FaMinus className={`absolute right-1 text-purple-900 text-2xl ${isOpen ? 'rotate-0' : 'rotate-90'} transition-all duration-700 max-custom-mq-300:hidden`} />
                <FaMinus className={`absolute right-1 text-purple-900 text-2xl transition-all max-custom-mq-300:hidden`} />
            </p>
            <div className={`accordion-content overflow-hidden ${isOpen ? 'open' : 'duration-300'}`}>
                <ul className="list-disc my-2 ml-6 text-left max-custom-mq-300:list-none max-custom-mq-300:ml-0">
                    <li className={`${sub300}`}>Interval duration: 0 - 120 seconds</li>
                    <hr className="h-[2px] my-1 bg-gray-300 mr-7 max-custom-mq-300:hidden" />
                    <li className={`${sub300}`}>Use (-/+)</li>
                    <li className={`${sub300}`}>Click the number to edit manually</li>
                    <li className={`${sub300}`}>Or click & use (↑/↓) on your keyboard</li>
                </ul>
            </div>

        </article>

        <hr className="mx-3 my-3" />
    </>);
}

export default WorkoutHelp;