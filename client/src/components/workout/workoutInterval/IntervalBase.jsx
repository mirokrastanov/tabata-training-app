import React, { useEffect, useState } from 'react';
import { decrementBy1, incrementBy1 } from '../../../utils/math';
import { FaCouch, FaDumbbell, FaPersonWalking, FaStopwatch } from 'react-icons/fa6';
import { BsPersonStanding } from "react-icons/bs";
import toast from 'react-hot-toast';


function IntervalBase({ type = 'work' }) {

    // take duration and keep order ID 0 (1st) always
    // auto generate it when loading create or edit views

    // TODO: MOVE all state to a context

    const [counter, setCounter] = useState(0);
    const [exercise, setExercise] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.type == 'number') {
            const newCounter = Number(e.target.value);
            if (newCounter <= 120 && newCounter >= 0) setCounter(newCounter);
            else if (newCounter < 0) {
                toast.error('Min interval duration reached.');
                setCounter(0);
            } else {
                toast.error('Max interval duration reached.');
                setCounter(120);
            }
        } else {
            const newExercise = e.target.value;
            setExercise(newExercise);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.dataset.id == '+') {
            if (counter == 120) toast.error('Max interval duration reached.');
            setCounter(incrementBy1(counter));
        }
        if (e.target.dataset.id == '-') {
            if (counter == 0) toast.error('Min interval duration reached.');
            setCounter(decrementBy1(counter));
        }
    };

    return (
        <section className="crw-i-1--ctr flex flex-nowrap justify-between bg-white px-1 mb-2">
            <div className="w-[20%] text-purple-900 text-5xl flex flex-col justify-center items-baseline gap-4 max-custom-mq-500:hidden">
                {type == 'preparation' && <FaPersonWalking />}
                {type == 'work' && <FaDumbbell className="rotate-45" />}
                {type == 'rest' && <BsPersonStanding />}
                {type == 'cooldown' && <FaCouch />}

                <FaStopwatch />
            </div>

            <div className="border-b-2 border-purple-900 pb-2 w-[80%] max-custom-mq-500:w-full">

                {/* TYPE */}
                <label htmlFor="crw--exercise" className="text-black text-xl w-full block py-2 max-custom-mq-300:text-lg">
                    {type == 'preparation' && 'Prepare'}
                    {type == 'work' && 'Work'}
                    {type == 'rest' && 'Rest'}
                    {type == 'cooldown' && 'Cooldown'}
                </label>

                {/* NAME */}
                <input
                    name="crw--exercise" id="crw--exercise" type="text" autoComplete="off" placeholder='Add description' value={exercise} onChange={handleChange}
                    className="w-full bg-white text-gray-700 p-2 pt-0 text-center text-xl max-custom-mq-300:text-lg"
                />

                {/* DURATION */}
                <div className="w-full flex flex-nowrap justify-between max-custom-mq-500:justify-around px-1">
                    <button onClick={handleClick} data-id="-"
                        className="relative h-12 w-12 rounded-full flex justify-center items-center text-purple-900 bg-purple-900 max-custom-mq-300:h-10 max-custom-mq-300:w-10 focus:outline-none active:bg-purple-600 transition-all">-
                        <div data-id="-" className="absolute w-[6px] h-4/6 bg-white rounded rotate-90 max-custom-mq-300:h-1/2"></div>
                    </button>
                    <input name="crw--counter" id="crw-i-1" type="number" value={counter} onChange={handleChange} className="bg-white text-purple-900 font-bold text-2xl text-center w-12" />
                    <button onClick={handleClick} data-id="+"
                        className="relative h-12 w-12 rounded-full flex justify-center items-center text-purple-900 bg-purple-900 max-custom-mq-300:h-10 max-custom-mq-300:w-10 focus:outline-none active:bg-purple-600 transition-all">+
                        <div data-id="+" className="absolute w-[6px] h-4/6 bg-white rounded max-custom-mq-300:h-1/2"></div>
                        <div data-id="+" className="absolute w-[6px] h-4/6 bg-white rounded rotate-90 max-custom-mq-300:h-1/2"></div>
                    </button>
                </div>
            </div>

        </section>
    )
}

export default IntervalBase;