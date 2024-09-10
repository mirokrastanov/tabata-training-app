import React, { useEffect, useState } from 'react';
import { decrementBy1, incrementBy1 } from '../../../utils/math';
import { FaCouch, FaDumbbell, FaPersonWalking, FaStopwatch } from 'react-icons/fa6';
import { BsPersonStanding } from "react-icons/bs";
import toast from 'react-hot-toast';

function ServiceInterval({ type = 'rest', i, slideIn = false, v, setV }) {
    const key = `crw--${i}--`;
    const slideAnim = slideIn ? 'slide-in-right' : '';
    if (!i) i = (Math.ceil(Math.random() * 100));

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;

        const isNumOrEmpty = value === '' || /^[0-9]*$/.test(value);
        if (!isNumOrEmpty) return;
        if (value === '') return setV('');

        const newCounter = Number(value);
        if (newCounter <= 120 && newCounter >= 0) setV(newCounter);
        else if (newCounter < 0) {
            toast.error('Min interval duration reached.');
            setV('0');
        } else {
            toast.error('Max interval duration reached.');
            setV('120');
        }
    };

    const handleBlur = (e) => {
        e.preventDefault();

        if (v === '') {
            setV('0');
        } else {
            const numericValue = Math.min(Math.max(Number(v), 0), 120);
            setV(String(numericValue));
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.dataset.id == '+') {
            if (Number(v) == 120) toast.error('Max interval duration reached.');
            setV(incrementBy1(v));
        }
        if (e.target.dataset.id == '-') {
            if (Number(v) == 0) toast.error('Min interval duration reached.');
            setV(decrementBy1(v));
        }
    };

    return (
        <section className={`${key}ctr flex flex-nowrap justify-between bg-white px-1 mb-2 ${slideAnim} max-custom-mq-300:pl-0`}>
            <div className="w-[20%] text-purple-900 text-5xl flex flex-col justify-center items-baseline gap-4 max-custom-mq-500:hidden">
                {type == 'preparation' && <FaPersonWalking />}
                {type == 'rest' && <BsPersonStanding />}
                {type == 'cooldown' && <FaCouch />}

                <FaStopwatch />
            </div>

            <div className="border-b-2 border-purple-900 pb-2 w-[80%] max-custom-mq-500:w-full">

                {/* TYPE */}
                <label htmlFor={`${key}name`} className="text-black text-xl w-full block py-2 max-custom-mq-300:text-lg">
                    {type == 'preparation' && 'Warm-up'}
                    {type == 'rest' && 'Rest'}
                    {type == 'cooldown' && 'Cooldown'}
                </label>

                {/* DURATION */}
                <div className="w-full flex flex-nowrap justify-between max-custom-mq-500:justify-around px-1">
                    <button onClick={handleClick} data-id="-"
                        className="relative h-12 w-12 rounded-full flex justify-center items-center text-purple-900 bg-purple-900 max-custom-mq-300:h-10 max-custom-mq-300:w-10 focus:outline-none transition-all hover:bg-purple-600 active:bg-purple-400 border-none">-
                        <div data-id="-" className="absolute w-[6px] h-4/6 bg-white rounded rotate-90 max-custom-mq-300:h-1/2"></div>
                    </button>

                    {/* NUMBER INPUT */}
                    <input
                        name={`${key}v`} id={`${key}duration`} type="text"
                        value={v} onChange={handleChange} onBlur={handleBlur}
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

export default ServiceInterval;


