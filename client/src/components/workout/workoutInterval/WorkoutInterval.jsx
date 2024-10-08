import React, { useEffect, useState } from 'react';
import { decrementBy1, incrementBy1 } from '../../../utils/math';
import { FaCouch, FaDumbbell, FaPersonWalking, FaStopwatch } from 'react-icons/fa6';
import { ImBin } from "react-icons/im";
import { RiDeleteBin5Line, RiDeleteBin2Line, RiDeleteBin6Line, RiDeleteBin2Fill } from "react-icons/ri";
import { BsPersonStanding } from "react-icons/bs";
import toast from 'react-hot-toast';


function WorkoutInterval({ i, slideIn = false, v, setV, deleteInterval, orderIndex, iFind, isView }) {
    const key = `crw--${i}--w-`;
    const slideAnim = slideIn ? 'slide-in-right' : '';
    if (!i) i = (Math.ceil(Math.random() * 100));

    // setV(orderIndex, exercise, duration)
    const handleChange = (e) => {
        e.preventDefault();
        const [id, value] = [e.target.id, e.target.value];

        if (id == `${key}duration`) {
            const duration = value; // DURATION INPUT
            const isNumOrEmpty = duration == '' || /^[0-9]*$/.test(duration);
            if (!isNumOrEmpty) return;
            if (duration == '') return setV(v.orderIndex, v.exercise, '');

            const newCounter = Number(duration);
            if (newCounter <= 120 && newCounter >= 0) setV(v.orderIndex, v.exercise, String(newCounter));
            else if (newCounter < 0) {
                toast.error('Min interval duration reached.');
                setV(v.orderIndex, v.exercise, '0');
            } else {
                toast.error('Max interval duration reached.');
                setV(v.orderIndex, v.exercise, '120');
            }
        } else if (id == `${key}name`) {
            const name = value; // NAME INPUT
            setV(v.orderIndex, name, String(v.duration));
        }
    };

    // setV(orderIndex, exercise, duration)
    const handleBlur = (e) => {
        e.preventDefault();
        const [id, duration] = [e.target.id, e.target.value];
        if (duration == v.duration) return;

        if (duration == '') {
            setV(v.orderIndex, v.exercise, '0');
        } else {
            const numericValue = Math.min(Math.max(Number(duration), 0), 120);
            setV(v.orderIndex, v.exercise, String(numericValue));
        }
    };

    // setV(orderIndex, exercise, duration)
    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.dataset.id == '+') {
            if (Number(v.duration) == 120) toast.error('Max interval duration reached.');
            setV(v.orderIndex, v.exercise, incrementBy1(v.duration));
        }
        if (e.target.dataset.id == '-') {
            if (Number(v.duration) == 0) toast.error('Min interval duration reached.');
            setV(v.orderIndex, v.exercise, decrementBy1(v.duration));
        }
    };

    return (
        <section className={`${key}ctr flex flex-nowrap justify-between px-1 ${isView ? 'bg-purple-200 rounded-t-lg pr-0' : 'bg-white mb-2 rounded-lg'} ${slideAnim} max-custom-mq-300:pl-0`}>
            <div className={`w-[20%] text-purple-900 text-5xl flex flex-col justify-center items-baseline gap-4 max-custom-mq-500:hidden ${isView ? 'pt-9' : ''}`}>
                <FaDumbbell className="rotate-45" />
                {isView || <FaStopwatch />}
            </div>

            <div className={`${isView ? '' : 'border-b-2 border-purple-900 pb-2'} w-[80%] max-custom-mq-500:w-full`}>
                {/* EXERCISE NUMBER IN VIEW WORKOUT */}
                {isView && <div className={`bg-purple-900 text-white absolute text-lg left-0 top-0 h-7 w-7 ${isView ? '' : 'mt-2'} rounded-lg flex justify-center items-center max-custom-mq-300:text-sm max-custom-mq-300:mt-0 max-custom-mq-300:h-5 max-custom-mq-300:w-6`} data-orderindex={orderIndex}>
                    {iFind ? Number(iFind(orderIndex)) + 1 : orderIndex}
                </div>}

                {/* TYPE */}
                {isView || <label htmlFor={`${key}name`} className="text-black text-xl w-full flex justify-center items-center py-2 max-custom-mq-300:text-lg relative">
                    {/* EXERCISE NUMBER NOT IN VIEW WORKOUT */}
                    <div className="bg-purple-900 text-white absolute text-lg left-0 h-7 w-7 mt-2 rounded-lg flex justify-center items-center max-custom-mq-300:text-sm max-custom-mq-300:mt-0 max-custom-mq-300:h-5 max-custom-mq-300:w-6" data-orderindex={orderIndex}>
                        {iFind ? Number(iFind(orderIndex)) + 1 : orderIndex}
                    </div>
                    Work
                    {/* DELETE BTN */}
                    <div className="group text-red-600 absolute right-0 h-10 w-8 flex justify-center items-center cursor-pointer" onClick={deleteInterval} data-orderindex={orderIndex}>
                        <RiDeleteBin2Line className="h-full w-8 p-1 block group-hover:hidden" />
                        <RiDeleteBin2Fill className="h-full w-8 p-1 hidden group-hover:block group-hover:shadow-lg rounded-md" />
                    </div>
                </label>}

                {/* NAME */}
                {isView || <input
                    name={`${key}name`} id={`${key}name`} type="text" autoComplete="off" placeholder='Exercise name' value={v.exercise} onChange={handleChange}
                    className={`w-full bg-white pt-0 tracking-wide text-purple-600 font-bold p-2 text-center text-2xl max-custom-mq-300:text-lg placeholder:font-normal placeholder:tracking-normal placeholder:text-xl`}
                />}
                {isView && <p className='bg-purple-200 max-custom-mq-300:pt-4 max-custom-mq-300:px-1  overflow-x-auto rounded-t-lg text-black font-bold p-2 text-center text-2xl max-custom-mq-300:text-lg'>{v.exercise}</p>}

                {/* DURATION */}
                <div className={`w-full flex flex-nowrap ${isView ? 'justify-center' : 'justify-between'} max-custom-mq-500:justify-around px-1`}>
                    {!isView && <button onClick={handleClick} data-id="-"
                        className="relative h-12 w-12 rounded-full flex justify-center items-center text-purple-900 bg-purple-900 max-custom-mq-300:h-10 max-custom-mq-300:w-10 focus:outline-none transition-all hover:bg-purple-600 active:bg-purple-400 border-none">-
                        <div data-id="-" className="absolute w-[6px] h-4/6 bg-white rounded rotate-90 max-custom-mq-300:h-1/2"></div>
                    </button>}

                    {/* NUMBER INPUT */}
                    <input disabled={isView}
                        name={`${key}counter`} id={`${key}duration`} type="text"
                        value={v.duration} onChange={handleChange} onBlur={handleBlur}
                        className={`${isView ? 'bg-purple-200' : 'bg-white'} text-purple-900 font-bold text-2xl text-center w-12`}
                    />

                    {!isView && <button onClick={handleClick} data-id="+"
                        className="relative h-12 w-12 rounded-full flex justify-center items-center text-purple-900 bg-purple-900 max-custom-mq-300:h-10 max-custom-mq-300:w-10 focus:outline-none transition-all hover:bg-purple-600 active:bg-purple-400 border-none">+
                        <div data-id="+" className="absolute w-[6px] h-4/6 bg-white rounded max-custom-mq-300:h-1/2"></div>
                        <div data-id="+" className="absolute w-[6px] h-4/6 bg-white rounded rotate-90 max-custom-mq-300:h-1/2"></div>
                    </button>}
                </div>
            </div>

        </section>
    )
}

export default WorkoutInterval;