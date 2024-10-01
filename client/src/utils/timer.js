export function startTimer(seconds) {
    let remainingTime = seconds;

    const intervalId = setInterval(() => {
        console.log(remainingTime);

        remainingTime--;

        if (remainingTime < 0) {
            clearInterval(intervalId);
            console.log('Timer finished!');
        }
    }, 1000);
}

export function startSequentialTimers(durations) { // takes an array of values in seconds
    let index = 0;

    function startNextTimer() {
        if (index < durations.length) {
            console.log(`Starting timer with duration: ${durations[index]} seconds`);
            let remainingTime = durations[index];

            const intervalId = setInterval(() => {
                console.log(remainingTime);

                remainingTime--;

                if (remainingTime < 0) {
                    clearInterval(intervalId);
                    console.log('Timer finished!');
                    index++;
                    startNextTimer();
                }
            }, 1000);
        } else {
            console.log('All timers finished!');
        }
    }

    startNextTimer();
}
