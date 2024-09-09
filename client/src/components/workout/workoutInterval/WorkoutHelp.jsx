import React from 'react';

function WorkoutHelp() {
    return (<>
        <hr className="mx-3 my-3.5" />

        <article className="text-gray-800 bg-purple-100 p-1 mb-4 rounded shadow-md border-gray-800 border">
            <ul className="list-disc ml-6 text-left">
                <li>Interval duration: 0 - 120 seconds</li>
                <hr className="h-[2px] bg-gray-800 mr-7" />
                <li>Use (-/+)</li>
                <li>Click the number to edit manually</li>
                <li>Or click & use (↑/↓) on your keyboard</li>
            </ul>
        </article>

        <hr className="mx-3 my-3" />
    </>)
}

export default WorkoutHelp;