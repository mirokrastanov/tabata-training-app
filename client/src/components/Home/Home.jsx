import React from 'react';
import './Home.css';
import { FaPlay, FaEllipsisVertical, FaArrowLeft, FaGear, FaPlus } from "react-icons/fa6";


function Home() {

    return (
        <div id="app__wrapper" className="bg-purple-900 text-white min-w-full max-w-[23rem] max-h-[46rem] flex flex-nowrap flex-col justify-start items-stretch rounded-lg">
            {/* Change with views */}
            <div id="app__titlebar" className="p-3">
                <div><FaArrowLeft /></div>
                <h3>Workouts: 2</h3>
                <div><FaGear /></div>
            </div>

            <div id="workouts__wrapper" className="bg-white p-1.5 flex flex-col gap-1.5">
                <article className="workout__card rounded p-3">
                    <section className="card__top">
                        <h3>HIIT Circuit 1</h3>
                        <div className="card__top-btn"><FaPlay /></div>
                        <div className="card__top-btn"><FaEllipsisVertical /></div>
                    </section>
                    <section className="card__mid">
                        <p>Prepare: 30 sec</p>
                        <p>Work: 45 sec - Jumping Jacks</p>
                        <p>Rest: 15 sec</p>
                        <p>Work: 45 sec - Burpees</p>
                        <p>Rest: 15 sec</p>
                        <p>...</p>
                    </section>
                    <section className="card__bottom">
                        <p>Total: 08:35 - 26 intervals</p>
                    </section>
                </article>

                <article className="workout__card">
                    <section className="card__top">
                        <h3>HIIT Circuit 2</h3>
                        <div className="card__top-btn"><FaPlay /></div>
                        <div className="card__top-btn"><FaEllipsisVertical /></div>
                    </section>
                    <section className="card__mid">
                        <p>Prepare: 30 sec</p>
                        <p>Work: 45 sec - Jumping Jacks</p>
                        <p>Rest: 15 sec</p>
                        <p>Work: 45 sec - Burpees</p>
                        <p>Rest: 15 sec</p>
                        <p>...</p>
                    </section>
                    <section className="card__bottom">
                        <p>Total: 08:35 - 26 intervals</p>
                    </section>
                </article>
            </div>

            <div className="app__bottom-overlay">
                <div className="overlay-info">
                    <p>Tap triangle to start</p>
                    <p>Three dots to edit or delete</p>
                    <p>Tap and hold to reorder</p>
                </div>
                <div className="overlay-btn">
                    <p><FaPlus /></p>
                </div>
            </div>
        </div>
    )
}

export default Home;