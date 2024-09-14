import React, { useState } from 'react';
import ActiveBtn from '../../components/btns/ActiveBtn';
import HBtnSeparator from '../../components/btns/HBtnSeparator';
import { workoutPresets } from '../../utils/workoutPresets';

function CreateLobby({ create, load }) {
    const [loadView, setLoadView] = useState(true);

    return (<div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md h-fit">
        {loadView ? (<>
            <ActiveBtn handler={create} text={'Create New'} />
            <HBtnSeparator />
            <ActiveBtn handler={() => setLoadView(!loadView)} text={'Load Preset'} />
        </>) : (<>
            <ActiveBtn handler={create} text={'Create New'} />
            <HBtnSeparator />
            <div className='bg-purple-400 cursor-not-allowed rounded-2xl rounded-b text-lg font-semibold transition-all h-11 flex justify-center items-center'>
                <p>Load Preset</p>
            </div>
            {/* plot the available presets */}
            {Object.entries(workoutPresets).map(([k, v], i) => <ActiveBtn
                key={`${i}--${k}`} text={v.workoutName} addMy={4} handler={load} preset={k}
            />)}
        </>)}



    </div>)
}

export default CreateLobby;