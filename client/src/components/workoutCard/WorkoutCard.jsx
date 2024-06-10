import React, { useEffect } from 'react';
import './WorkoutCard.css';
import { FaPlay, FaEllipsisVertical, FaArrowLeft, FaGear, FaPlus } from "react-icons/fa6";


function WorkoutCard({ color, i }) {
    // asign random color on workout creation & save it as part of the schema on DB

    // Temp funciton
    const genActivities = (num) => {
        const list = ['Jumping Jacks', 'Static Squats', 'Burpees'];
        const list2 = ['Pushups', 'Overhead Press', 'Reverse Fly'];
        return num == 1
            ? list[Math.floor(Math.random() * list.length)]
            : list2[Math.floor(Math.random() * list2.length)];
    };

    return (
        <article className="workout__card rounded-md transition-all cursor-pointer" style={{ background: color }}>
            <section className="card__top text-white rounded-t-md w-full flex flex-nowrap flex-row items-center h-10">
                <div className="h-full w-[calc(100%-5rem)] flex justify-start items-center pl-3 rounded-tl-md">
                    <h3 className="text-lg font-bold text-ellipsis line-clamp-1">HIIT Circuit c{i}</h3>
                </div>
                <div className="card__top-btn h-full w-10 flex justify-center items-center text-xl hover:bg-slate-50/25 rounded-md hover:shadow-md active:scale-90"><FaPlay /></div>
                <div className="card__top-btn h-full w-10 flex justify-center items-center text-xl hover:bg-slate-50/25 rounded-md hover:shadow-md active:scale-90"><FaEllipsisVertical /></div>
            </section>
            <section className="card__mid flex flex-col pl-3 pt-1 justify-center items-start leading-5">
                <p>1. Prepare: 30 sec</p>
                <p>2. Work: 45 sec - {genActivities(1)}</p>
                <p>3. Rest: 15 sec</p>
                <p>4. Work: 45 sec - {genActivities(2)}</p>
                <p>5. Rest: 15 sec</p>
                <p>...</p>
            </section>
            <section className="card__bottom flex flex-col pl-3 p-2 justify-center items-start rounded-b-md">
                <p>Total: 08:35 - 26 intervals</p>
            </section>
        </article>
    )
}

export default WorkoutCard;