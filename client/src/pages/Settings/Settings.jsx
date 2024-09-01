import React from 'react';
import './Settings.css';
import ToggleBtn from '../../components/btns/toggleBtn/ToggleBtn';

function Settings() {
    return (
        <div className="bg-gray-100 w-full rounded-b-xl text-black flex flex-col items-center h-[calc(100%-3.5rem)] overflow-y-scroll pb-8">

            <h2 className="text-2xl font-bold mt-4 mb-1 rounded-md">Timer</h2>
            <article className="text-lg p-2 px-4 rounded-md border-b-2 border-t-2 border-black hover:border-purple-700 transition-all cursor-pointer">
                <h2 className="text-xl font-bold mb-2">Default values</h2>
                <section className="flex flex-col items-start">
                    <p>Prepare: 10 sec</p>
                    <p>Work: 20 sec</p>
                    <p>Rest: 10 sec</p>
                    <p>Cycles: 8</p>
                    <p>Sets: 1</p>
                    <p>Rest between sets: 0 sec</p>
                    <p>Cool down: 0 sec</p>
                </section>
            </article>

            <h2 className="text-2xl font-bold mt-12 mb-1 rounded-md">Timer Screen</h2>
            <article className="text-lg p-2 px-4 rounded-md border-b-2 border-t-2 border-black hover:border-purple-700 transition-all cursor-pointer">
                <h2 className="text-xl font-bold mb-2">Set up timer screen</h2>
                <section className="flex flex-col items-start">
                    <p>Timer size</p>
                    <p>List of intervals</p>
                    <p>Count up/down</p>
                    <p>Buttons</p>
                    <p>Pause/delay between intervals</p>
                    <p>Colors</p>
                    <p>Other settings</p>
                </section>
            </article>

            <h2 className="text-2xl font-bold mt-12 mb-1 rounded-md">Sound</h2>
            <article className="text-lg p-2 px-4 rounded-md border-b-2 border-t-2 border-black hover:border-purple-700 transition-all cursor-pointer">
                <section className="flex flex-row flex-nowrap justify-between">
                    {/* TODO: ADD State */}
                    <h2 className="text-xl font-bold mb-2">Sounds</h2>
                    <ToggleBtn />
                </section>
                <section className="flex flex-col items-start">
                    <p>Prepare: Boxing bell</p>
                    <p>Work: Whistle</p>
                    <p>Rest: Boxing bell</p>
                    <p>Rest between sets: Boxing bell</p>
                    <p>Cool down: Boxing bell</p>
                    <p>Finish: Boxing bell three times</p>
                    <p>Last seconds for each interval: Click, 3sec</p>
                </section>
            </article>

            {/* TODO */}
            {/* Backup section with Export / Import options */}
            {/* About section with overall training statistics */}
            {/* Version - could skip if no post-launch progression planned - TBD */}

        </div>
    )
}

export default Settings;