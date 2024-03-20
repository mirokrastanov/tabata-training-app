import { useState, useEffect } from 'react';

export function useTimer(initialTimer) {
    const [timer, setTimer] = useState(initialTimer);
    const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    const updatedTimer = [...prevTimer];
                    updatedTimer[currentTimerIndex].remainingSeconds -= 1;
                    return updatedTimer;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, currentTimerIndex]);

    useEffect(() => {
        if (isActive && timer[currentTimerIndex].remainingSeconds === 0) {
            if (currentTimerIndex === timer.length - 1) {
                setIsActive(false);
            } else {
                setCurrentTimerIndex((prevIndex) => prevIndex + 1);
            }
        }
    }, [timer, currentTimerIndex, isActive]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setTimer(initialTimer);
        setCurrentTimerIndex(0);
        setIsActive(false);
    };

    return {
        timer,
        isActive,
        toggleTimer,
        resetTimer,
    };
}
