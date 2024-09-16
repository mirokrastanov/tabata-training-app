import React, { useEffect } from 'react';
import './WorkoutCard.css';
import { FaPlay, FaEllipsisVertical, FaArrowLeft, FaGear, FaPlus } from "react-icons/fa6";
import { getTotalWorkoutTime } from '../../../utils/math';
import WCardDropdownMenu from './WCardDropdownMenu';


function WorkoutCard({ color, i, handler, data = {} }) {
    const colorScheme = { "--bg-c": color };
    const workoutID = data?._id;
    const clickHandler = (e) => handler(e, workoutID);
    const toPlot = [];
    data?.exercises.slice(0, 2).forEach((x, i) => {
        toPlot.push(x);
        toPlot.push({ rest: data?.break });
    });
    const totalTime = getTotalWorkoutTime(data);
    const intervalCount = 2 + (data?.exercises.length * 2);

    useEffect(() => {
        // console.log(data);
    }, []);

    // Temp funciton
    const genActivities = (num) => {
        const list = ['Jumping Jacks', 'Static Squats', 'Burpees'];
        const list2 = ['Pushups', 'Overhead Press', 'Reverse Fly'];
        return num == 1
            ? list[Math.floor(Math.random() * list.length)]
            : list2[Math.floor(Math.random() * list2.length)];
    };

    return (
        <article className="workout__card rounded-md cursor-pointer"
            style={colorScheme} onClick={clickHandler}>
            <section className="card__top text-white rounded-t-md w-full flex flex-nowrap flex-row items-center h-10">
                <div className="h-full w-[calc(100%-5rem)] flex justify-start items-center pl-3 rounded-tl-md">
                    <h3 className="text-md font-bold text-left text-ellipsis line-clamp-1 tracking-wide">
                        {data?.workoutName}
                    </h3>
                </div>
                <div className="card__top-play card__top-btn h-full w-10 flex justify-center items-center text-xl hover:bg-slate-50/25 rounded-md hover:shadow-md active:scale-90">
                    <FaPlay />
                </div>
                <div className="card__top-menu card__top-btn h-full w-10 flex justify-center items-center text-xl hover:bg-slate-50/25 rounded-md hover:shadow-md active:scale-90 relative">
                    <FaEllipsisVertical />
                    <WCardDropdownMenu />
                </div>
            </section>
            <section className="card__mid flex flex-col pl-3 pt-1 justify-center items-start leading-5 font-semibold">
                <p className="text-ellipsis line-clamp-1 text-[15px]">1. Prepare: {data?.preparation || 30}s</p>
                {toPlot.map((x, i) => (
                    <p key={`elist-${i}`} className="text-ellipsis line-clamp-1 text-[15px] mt-[1px]">
                        {x?.rest ? (
                            <>{i + 2}. Rest: {x?.rest}s</>
                        ) : (
                            <>{i + 2}. Work: {x?.duration || 60}s - {x?.exercise || genActivities(1)}</>
                        )}
                    </p>
                ))}
                <p>...</p>
            </section>
            <section className="card__bottom flex flex-col pl-3 p-2 justify-center items-start rounded-b-md text-[15px] font-semibold">
                <p className='max-custom-mq-300:self-center'>Total Time: <span className='tracking-wider'>
                    {totalTime}</span> min</p>
                <p className='max-custom-mq-300:self-center'>Intervals: {intervalCount}</p>
            </section>
        </article>
    )
}

export default WorkoutCard;