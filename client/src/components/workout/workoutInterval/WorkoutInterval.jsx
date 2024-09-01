import React, { useEffect, useState } from 'react';
import { decrementBy1, incrementBy1 } from '../../../utils/math';
import { FaDumbbell, FaStopwatch } from 'react-icons/fa6';

function WorkoutInterval({ type = 'Work' }) {
    const [counter, setCounter] = useState(0);
    const [exercise, setExercise] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
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
        if (e.target.dataset.id == '+') setCounter(incrementBy1(counter));
        if (e.target.dataset.id == '-') setCounter(decrementBy1(counter));
    };

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
        <section className="crw-i-1--ctr flex flex-nowrap justify-between bg-yellow-100">
            <div className="w-[20%] bg-pink-300 text-purple-900 text-5xl flex flex-col justify-center items-center gap-4 max-custom-mq-500:hidden">
                <FaDumbbell className="rotate-45" />
                <FaStopwatch />
            </div>

            <div className="border-b-2 border-purple-900 pb-2 w-[80%] max-custom-mq-500:w-full">
                
                {/* TYPE */}
                <label htmlFor="crw--exercise" className="text-black text-xl bg-red-300 w-full block py-2 max-custom-mq-300:text-lg">Work</label>
                
                {/* NAME */}
                <input
                    name="crw--exercise" id="crw--exercise" type="text" autoComplete="off" placeholder='Exercise name' value={exercise} onChange={handleChange}
                    className="w-full bg-gray-100 text-gray-700 p-2 text-center text-xl max-custom-mq-300:text-lg"
                />

                {/* DURATION */}
                <div className="w-full bg-green-200 flex flex-nowrap justify-between max-custom-mq-500:justify-around">
                    <button onClick={handleClick} data-id="-"
                        className="relative h-12 w-12 rounded-full flex justify-center items-center text-purple-900 bg-purple-900 max-custom-mq-300:h-10 max-custom-mq-300:w-10">-
                        <div data-id="-" className="absolute w-[6px] h-4/6 bg-white rounded rotate-90 max-custom-mq-300:h-1/2"></div>
                    </button>
                    <input name="crw--counter" id="crw-i-1" type="number" value={counter} onChange={handleChange} min={0} max={120} className="bg-purple-900 text-white text-2xl text-center w-12" />
                    <button onClick={handleClick} data-id="+"
                        className="relative h-12 w-12 rounded-full flex justify-center items-center text-purple-900 bg-purple-900 max-custom-mq-300:h-10 max-custom-mq-300:w-10">+
                        <div data-id="+" className="absolute w-[6px] h-4/6 bg-white rounded max-custom-mq-300:h-1/2"></div>
                        <div data-id="+" className="absolute w-[6px] h-4/6 bg-white rounded rotate-90 max-custom-mq-300:h-1/2"></div>
                    </button>
                </div>
            </div>

        </section>
    )
}

export default WorkoutInterval;