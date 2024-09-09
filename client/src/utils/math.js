export const incrementBy1 = (v) => {
    return Number(v) + 1 >= 120 ? v : String(Number(v) + 1);
};

export const decrementBy1 = (v) => {
    return Number(v) - 1 < 0 ? '0' : String(Number(v) - 1);
};