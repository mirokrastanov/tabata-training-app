import React, { useEffect, useState } from 'react';
import { decrementBy1, incrementBy1 } from '../../../utils/math';
import { FaCouch, FaDumbbell, FaPersonWalking, FaStopwatch } from 'react-icons/fa6';
import { ImBin } from "react-icons/im";
import { RiDeleteBin5Line, RiDeleteBin2Line, RiDeleteBin6Line, RiDeleteBin2Fill } from "react-icons/ri";
import { BsPersonStanding } from "react-icons/bs";
import toast from 'react-hot-toast';


function WorkoutInterval({ type = 'work', i = (Math.ceil(Math.random() * 100)), slideIn = false }) {
    const key = `crw--${i}--`;
    const slideAnim = slideIn ? 'slide-in-right' : '';
    // take duration and keep order ID 0 (1st) always
    // auto generate it when loading create or edit views

    // TODO: MOVE all state to a context

    const [counter, setCounter] = useState('0');
    const [exercise, setExercise] = useState('');
    const [intervalID, setIntervalID] = useState('5');

    const handleChange = (e) => {
        e.preventDefault();
        const [value, id] = [e.target.value, e.target.id];

        if (id == `${key}duration`) {
            // DURATION INPUT (input=string, check=number, save=string)
            const isNumOrEmpty = value === '' || /^[0-9]*$/.test(value);
            if (!isNumOrEmpty) return;
            if (value === '') return setCounter('');

            const newCounter = Number(value);
            if (newCounter <= 120 && newCounter >= 0) setCounter(newCounter);
            else if (newCounter < 0) {
                toast.error('Min interval duration reached.');
                setCounter('0');
            } else {
                toast.error('Max interval duration reached.');
                setCounter('120');
            }
        } else if (id == `${key}name`) {
            // NAME INPUT
            const newInterval = value;
            setExercise(newInterval);
        }
    };

    const handleBlur = (e) => {
        e.preventDefault();

        if (counter === '') {
            setCounter('0');
        } else {
            const numericValue = Math.min(Math.max(Number(counter), 0), 120);
            setCounter(String(numericValue));
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.dataset.id == '+') {
            if (Number(counter) == 120) toast.error('Max interval duration reached.');
            setCounter(incrementBy1(counter));
        }
        if (e.target.dataset.id == '-') {
            if (Number(counter) == 0) toast.error('Min interval duration reached.');
            setCounter(decrementBy1(counter));
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();
        // TODO: delete work interval and it's corresponding break - to call a context function
        // and just execute it
    };

    return (
        <section className={`${key}ctr flex flex-nowrap justify-between bg-white px-1 mb-2 ${slideAnim}`}>
            <div className="w-[20%] text-purple-900 text-5xl flex flex-col justify-center items-baseline gap-4 max-custom-mq-500:hidden">
                {type == 'preparation' && <FaPersonWalking />}
                {type == 'work' && <FaDumbbell className="rotate-45" />}
                {type == 'rest' && <BsPersonStanding />}
                {type == 'cooldown' && <FaCouch />}

                <FaStopwatch />
            </div>

            <div className="border-b-2 border-purple-900 pb-2 w-[80%] max-custom-mq-500:w-full">

                {/* TYPE */}
                <label htmlFor={`${key}name`} className="text-black text-xl w-full flex justify-center items-center py-2 max-custom-mq-300:text-lg relative">
                    <div className="group text-red-600 absolute right-0 h-10 w-8 flex justify-center items-center cursor-pointer" onClick={handleDelete}>
                        <RiDeleteBin2Line className="h-full w-8 p-1 block group-hover:hidden" />
                        <RiDeleteBin2Fill className="h-full w-8 p-1 hidden group-hover:block group-hover:shadow-lg rounded-md" />
                    </div>
                    {type == 'preparation' && 'Prepare'}
                    {type == 'work' && 'Work'}
                    {type == 'rest' && 'Rest'}
                    {type == 'cooldown' && 'Cooldown'}
                </label>

                {/* NAME */}
                <input
                    name={`${key}name`} id={`${key}name`} type="text" autoComplete="off" placeholder='Exercise name' value={exercise} onChange={handleChange}
                    className="w-full bg-white text-black font-bold p-2 pt-0 text-center text-2xl max-custom-mq-300:text-lg tracking-wide placeholder:font-normal placeholder:tracking-normal placeholder:text-xl"
                />

                {/* DURATION */}
                <div className="w-full flex flex-nowrap justify-between max-custom-mq-500:justify-around px-1">
                    <button onClick={handleClick} data-id="-"
                        className="relative h-12 w-12 rounded-full flex justify-center items-center text-purple-900 bg-purple-900 max-custom-mq-300:h-10 max-custom-mq-300:w-10 focus:outline-none transition-all hover:bg-purple-600 active:bg-purple-400 border-none">-
                        <div data-id="-" className="absolute w-[6px] h-4/6 bg-white rounded rotate-90 max-custom-mq-300:h-1/2"></div>
                    </button>

                    {/* NUMBER INPUT */}
                    <input
                        name={`${key}counter`} id={`${key}duration`} type="text"
                        value={counter} onChange={handleChange} onBlur={handleBlur}
                        className="bg-white text-purple-900 font-bold text-2xl text-center w-12"
                    />

                    <button onClick={handleClick} data-id="+"
                        className="relative h-12 w-12 rounded-full flex justify-center items-center text-purple-900 bg-purple-900 max-custom-mq-300:h-10 max-custom-mq-300:w-10 focus:outline-none transition-all hover:bg-purple-600 active:bg-purple-400 border-none">+
                        <div data-id="+" className="absolute w-[6px] h-4/6 bg-white rounded max-custom-mq-300:h-1/2"></div>
                        <div data-id="+" className="absolute w-[6px] h-4/6 bg-white rounded rotate-90 max-custom-mq-300:h-1/2"></div>
                    </button>
                </div>
            </div>

        </section>
    )
}

export default WorkoutInterval;