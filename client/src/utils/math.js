export const incrementBy1 = (v) => {
    return Number(v) + 1 >= 120 ? v : String(Number(v) + 1);
};

export const decrementBy1 = (v) => {
    return Number(v) - 1 < 0 ? '0' : String(Number(v) - 1);
};

export const getTotalWorkoutTime = (w) => {
    const [prep, cooldown, rest] = [w.preparation, w.cooldown, w.break];
    const serviceTotal = Number(prep) + Number(cooldown);
    const exercises = w.exercises;
    const exerciseTotal = exercises.reduce((total, exercise) => {
        return total + Number(exercise.duration) + Number(rest);
    }, 0);
    const sum = serviceTotal + exerciseTotal;
    const min = Math.trunc(sum / 60);
    const sec = sum % 60;

    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;

};