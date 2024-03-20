import React from 'react';
import { useTimer } from '../../hooks/useTimer';
import './Timer.css';

function Timer() {
    const initialTimer = [
        { duration: 5, label: "Timer 1" },
        { duration: 10, label: "Timer 2" },
        { duration: 15, label: "Timer 3" },
    ];

    const { timer, isActive, toggleTimer, resetTimer } = useTimer(
        initialTimer.map((timer) => ({ ...timer, remainingSeconds: timer.duration }))
    );

    return (
        <div>
            {timer.map((timer, index) => (
                <div key={index}>
                    <h2>{timer.label}: {timer.remainingSeconds} sec</h2>
                </div>
            ))}
            <div className="btns">
                <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
}

export default Timer;
