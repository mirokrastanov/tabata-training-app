export const incrementBy1 = (v) => {
    if (v >= 120) return v;
    return v + 1;
};

export const decrementBy1 = (v) => {
    if (v <= 0) return v;
    return v - 1;
};