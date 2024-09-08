import React, { useEffect, useState } from 'react';
import { decrementBy1, incrementBy1 } from '../../../utils/math';
import { FaDumbbell, FaPersonWalking, FaStopwatch } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import IntervalBase from './IntervalBase';

function Break({ }) {
    // take duration and keep order ID 0 (1st) always
    // auto generate it when loading create or edit views

    const [counter, setCounter] = useState(0);
    const [exercise, setExercise] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.type == 'number') {
            const newCounter = Number(e.target.value);
            if (newCounter <= 120 && newCounter >= 0) setCounter(newCounter);
            else if (newCounter < 0) {
                toast.error('Min interval duration reached.');
                setCounter(0);
            } else {
                toast.error('Max interval duration reached.');
                setCounter(120);
            }
        } else {
            const newExercise = e.target.value;
            setExercise(newExercise);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (e.target.dataset.id == '+') {
            if (counter == 120) toast.error('Max interval duration reached.');
            setCounter(incrementBy1(counter));
        }
        if (e.target.dataset.id == '-') {
            if (counter == 0) toast.error('Min interval duration reached.');
            setCounter(decrementBy1(counter));
        }
    };

    const sampleWorkout = {
        creatorId: 'creatorId',
        preparation: 30,
        break: 15,
        cooldown: 60,
        exercises: [
            { exercise: 'Jumping Jacks', duration: 45, orderIndex: 1 },
        ],
    };

    // TODO: ADD i from mapping inside parent
    // ADD conditional rendering for Prepare, Work, Rest, Cycles, Sets, Rest between sets, cooldown
    // DON'T FORGET icons must be different and in different combinations

    return (<>
        <IntervalBase type='rest' />
    </>)
}

export default Break;


