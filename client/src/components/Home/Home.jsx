import React from 'react';
import { FaPlay, FaEllipsisVertical } from "react-icons/fa6";


function Home() {

    return (
        <div id="app__wrapper">

            <div id="app__titlebar">
                {/* Change with views */}

            </div>

            <div id="workouts__wrapper">
                <article className="workout__card">
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

            </div>

        </div>
    )
}

export default Home;