import React, { useEffect, useState } from 'react';
import { decrementBy1, incrementBy1 } from '../../../utils/math';

function WorkoutInterval() {
    const [counter, setCounter] = useState(0);
    const [exercise, setExercise] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        console.log(e.target.type);
        if (e.target.type == 'number') {
            const newCounter = Number(e.target.value);
            if (newCounter <= 120 && newCounter >= 0) setCounter(newCounter);
            else if (newCounter < 0) setCounter(0);
            else setCounter(120);
        } else {
            const newExercise = e.target.value;
            setExercise(newExercise);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        const action = e.target.textContent;
        if (action == '+') setCounter(incrementBy1(counter));
        else setCounter(decrementBy1(counter));
    };

    useEffect(() => {
        console.log(counter);
    }, [counter]);

    const sampleWorkout = {
        creatorId: 'creatorId',
        preparation: 30,
        break: 15,
        cooldown: 60,
        exercises: [
            { exercise: 'Jumping Jacks', duration: 45, orderIndex: 1 },
        ],
    };

    // TODO: ADD i from mapping inside parent
    return (
        <section className="crw-i-1--ctr">
            {/* TYPE */}
            <label htmlFor="crw-i-1--label" className="text-black text-xl bg-red-300 w-full block py-2">Prepare</label>
            {/* NAME */}
            <input name="crw-i-1--exercise" id="crw-i-1--exercise" type="text" value={exercise} onChange={handleChange} autoComplete="off" placeholder='Exercise name' className="w-full bg-gray-100 text-gray-700 p-2 text-center text-xl max-custom-mq-300:text-lg" />
            {/* DURATION */}
            <div className="crw-counter-input w-full bg-green-200 flex flex-nowrap justify-between max-custom-mq-500:justify-around">
                <button onClick={handleClick}
                    className="relative h-12 w-12 rounded-full flex justify-center items-center text-purple-900 bg-purple-900">-
                    <div className="absolute w-[6px] h-4/6 bg-white rounded"></div>
                </button>
                <input name="crw-i-1--counter" id="crw-i-1" type="number" value={counter} onChange={handleChange} min={0} max={120} className="bg-purple-900 text-white text-xl text-center w-12" />
                <button onClick={handleClick}
                    className="relative h-12 w-12 rounded-full flex justify-center items-center text-purple-900 bg-purple-900">+
                    <div className="absolute w-[6px] h-4/6 bg-white rounded"></div>
                    <div className="absolute w-[6px] h-4/6 bg-white rounded rotate-90"></div>
                </button>
            </div>
        </section>
    )
}

export default WorkoutInterval;