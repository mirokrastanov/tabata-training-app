export const workoutPresets = {
    initial: {
        workoutName: 'Standard HIIT',
        prep: '30',
        rest: '15',
        cooldown: '60',
        intervals: [
            { orderIndex: '1', duration: '30', exercise: 'Jumping Jacks' },
            { orderIndex: '2', duration: '30', exercise: 'Push-ups' },
            { orderIndex: '3', duration: '30', exercise: 'Situps' },
            { orderIndex: '4', duration: '30', exercise: 'Squats' },
            { orderIndex: '5', duration: '30', exercise: 'Leg Raises' },
            { orderIndex: '6', duration: '30', exercise: 'Lunges' },
            { orderIndex: '7', duration: '30', exercise: 'High Knees' },
            { orderIndex: '8', duration: '30', exercise: 'Russian Twists' },
        ],
    },
    intermediate: {
        workoutName: 'Intermediate HIIT',
        prep: '30',
        rest: '10',
        cooldown: '60',
        intervals: [
            { orderIndex: '1', duration: '30', exercise: 'Jumping Jacks' },
            { orderIndex: '2', duration: '30', exercise: 'Static Squat' },
            { orderIndex: '3', duration: '30', exercise: 'Push-ups' },
            { orderIndex: '4', duration: '30', exercise: 'Crunches' },
            { orderIndex: '5', duration: '30', exercise: 'Step onto a chair' },
            { orderIndex: '6', duration: '30', exercise: 'Squats' },
            { orderIndex: '7', duration: '30', exercise: 'Chair dips' },
            { orderIndex: '8', duration: '30', exercise: 'Plank' },
            { orderIndex: '9', duration: '30', exercise: 'High knees' },
            { orderIndex: '10', duration: '30', exercise: 'Lunges' },
            { orderIndex: '11', duration: '30', exercise: 'Push-up & rotation' },
            { orderIndex: '12', duration: '30', exercise: 'Left-side plank' },
            { orderIndex: '13', duration: '30', exercise: 'Right-side plank' },
        ]
    },
    advanced: {
        workoutName: 'Advanced HIIT',
        prep: '30',
        rest: '15',
        cooldown: '60',
        intervals: [
            { orderIndex: '1', duration: '45', exercise: 'Jumping Jacks' },
            { orderIndex: '2', duration: '45', exercise: 'Burpees' },
            { orderIndex: '3', duration: '45', exercise: 'High Knees' },
            { orderIndex: '4', duration: '45', exercise: 'Mountain Climbers' },
            { orderIndex: '5', duration: '45', exercise: 'Jump Squats' },
            { orderIndex: '6', duration: '45', exercise: 'Alternating Lunges' },
        ],
    },
};


export const exerciseLibrary = [
    { exercise: 'Jumping Jacks', duration: 30 },
    { exercise: 'Push-ups', duration: 30 },
    { exercise: 'Situps', duration: 30 },
    { exercise: 'Squats', duration: 30 },
    { exercise: 'Leg Raises', duration: 30 },
    { exercise: 'Lunges', duration: 30 },
    { exercise: 'High Knees', duration: 30 },
    { exercise: 'Russian Twists', duration: 30 },
    { exercise: 'Static Squat', duration: 30 },
    { exercise: 'Crunches', duration: 30 },
    { exercise: 'Step onto a chair', duration: 30 },
    { exercise: 'Chair dips', duration: 30 },
    { exercise: 'Plank', duration: 30 },
    { exercise: 'Push-up & rotation', duration: 30 },
    { exercise: 'Left-side plank', duration: 30 },
    { exercise: 'Right-side plank', duration: 30 },
    { exercise: 'Burpees', duration: 45 },
    { exercise: 'Mountain Climbers', duration: 45 },
    { exercise: 'Jump Squats', duration: 45 },
    { exercise: 'Alternating Lunges', duration: 45 },
];