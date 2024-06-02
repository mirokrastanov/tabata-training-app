import React from 'react';
import { FaPlay, FaEllipsisVertical, FaArrowLeft, FaGear, FaPlus } from "react-icons/fa6";


function WorkoutCard({ color, i }) {

    return (
        <article className="workout__card rounded-md p-3" style={{ background: color }}>
            <section className="card__top">
                <h3 className="text-xl font-bold">HIIT Circuit c{i}</h3>
                <div className="card__top-btn"><FaPlay /></div>
                <div className="card__top-btn"><FaEllipsisVertical /></div>
            </section>
            <section className="card__mid">
                <p>Prepare: 30 sec</p>
                <p>Work: 45 sec - Jumping Jacks</p>
                <p>Rest: 15 sec</p>
                <p>...</p>
            </section>
            <section className="card__bottom">
                <p>Total: 08:35 - 26 intervals</p>
            </section>
        </article>
    )
}

export default WorkoutCard;